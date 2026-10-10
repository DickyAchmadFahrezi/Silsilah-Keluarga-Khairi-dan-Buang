import { familyData, isCousinMarriage } from '../data';

/**
 * Menghitung posisi bagan silsilah pohon keluarga berjenjang
 * yang mendukung DUA pernikahan menyilang (Cross-Marriage 1 & Cross-Marriage 2).
 */
export function generateTreeElements(allData = familyData, options = {}) {
  const {
    activeBranch = 'Muchsin-Maryanah', // Default ke pernikahan silang 2 agar langsung tampak keajaiban silsilahnya!
    searchQuery = '',
    isCousinHighlight = false,
  } = options;

  const CARD_WIDTH = 220;
  const CARD_GAP = 35;
  const UNIT_WIDTH = CARD_WIDTH + CARD_GAP;

  // Level generasi vertikal
  const Y_GEN1 = 60;   // Khairi & Buang
  const Y_GEN2 = 280;  // Abdul Ghani, Asyuro, Hanifah, Madji
  const Y_GEN3 = 520;  // Anak Gen 3 (Muchsin & Maryanah, dll)
  const Y_GEN4 = 760;  // Cucu
  const Y_GEN5 = 1000; // Cicit
  const Y_GEN6 = 1240; // Canggah

  // Filter data yang akan dirender berdasarkan pilihan cabang
  let displayedData = allData;

  if (activeBranch === 'Muchsin-Maryanah') {
    // Tampilkan Silang 2 lengkap: Khairi, Buang -> Abdul Ghani & Asyuro, Hanifah & Madji -> Muchsin & Maryanah -> Keturunan mereka
    const muchsinFamilyIds = allData
      .filter((p) => p.branch === 'Muchsin-Maryanah')
      .map((p) => p.id);
    const coreIds = ['khairi', 'buang', 'abdul_ghani', 'asyuro', 'hanifah', 'madji', ...muchsinFamilyIds];
    displayedData = allData.filter((p) => coreIds.includes(p.id));
  } else if (activeBranch === 'silang1') {
    // Tampilkan Silang 1: Khairi, Buang -> Hanifah, Madji
    displayedData = allData.filter((p) =>
      ['khairi', 'buang', 'hanifah', 'madji'].includes(p.id)
    );
  } else if (activeBranch === 'khairi_buang') {
    // Tampilkan Gen 1 & Gen 2
    displayedData = allData.filter((p) =>
      ['khairi', 'buang', 'abdul_ghani', 'asyuro', 'hanifah', 'madji'].includes(p.id)
    );
  } else if (activeBranch !== 'all') {
    // Cabang spesifik:
    const branchItems = allData.filter((p) => p.branch === activeBranch);
    const isCabangA = branchItems.some((p) => p.group === 'cabang_a');

    let ancestorIds = [];
    if (isCabangA) {
      ancestorIds = ['khairi', 'abdul_ghani', 'asyuro'];
    } else {
      ancestorIds = ['khairi', 'buang', 'hanifah', 'madji'];
    }

    displayedData = allData.filter(
      (p) => ancestorIds.includes(p.id) || p.branch === activeBranch
    );
  }

  const positions = {};
  const branchBounds = {};

  // Tata letak khusus untuk Silang 2 (Muchsin & Maryanah):
  if (activeBranch === 'Muchsin-Maryanah') {
    // Keturunan Muchsin & Maryanah di Gen 4 & 5
    const gen4Children = displayedData.filter(
      (p) => p.generation === 4 && (p.parents.includes('maryanah') || p.parents.includes('muchsin'))
    );

    let currentX = 100;
    gen4Children.forEach((g4) => {
      const gen5Children = displayedData.filter(
        (p) => p.generation === 5 && p.parents.includes(g4.id)
      );

      let g4Width = UNIT_WIDTH;
      if (g4.spouses && g4.spouses.length > 0) {
        g4Width = UNIT_WIDTH * 2;
      }
      const gen5TotalWidth = Math.max(1, gen5Children.length) * UNIT_WIDTH;
      const blockWidth = Math.max(g4Width, gen5TotalWidth);

      const g4CenterX = currentX + (blockWidth - g4Width) / 2;
      positions[g4.id] = { x: g4CenterX, y: Y_GEN4 };

      if (g4.spouses && g4.spouses.length > 0) {
        const spId = g4.spouses[0];
        positions[spId] = { x: g4CenterX + UNIT_WIDTH, y: Y_GEN4 };
      }

      let gen5CurrentX = currentX;
      gen5Children.forEach((g5) => {
        positions[g5.id] = { x: gen5CurrentX, y: Y_GEN5 };
        gen5CurrentX += UNIT_WIDTH;
      });

      currentX += blockWidth + 40;
    });

    const totalWidth = currentX;
    const centralX = totalWidth / 2;

    // Muchsin & Maryanah di Gen 3 (Pusat pertemuan kedua cabang)
    positions['muchsin'] = { x: centralX - UNIT_WIDTH - 20, y: Y_GEN3 };
    positions['maryanah'] = { x: centralX + 20, y: Y_GEN3 };

    // Orang tua Muchsin di Gen 2 (Abdul Ghani & Asyuro) di sebelah kiri
    positions['asyuro'] = { x: positions['muchsin'].x - UNIT_WIDTH - 20, y: Y_GEN2 };
    positions['abdul_ghani'] = { x: positions['muchsin'].x, y: Y_GEN2 };

    // Orang tua Maryanah di Gen 2 (Hanifah & Madji) di sebelah kanan
    positions['hanifah'] = { x: positions['maryanah'].x, y: Y_GEN2 };
    positions['madji'] = { x: positions['maryanah'].x + UNIT_WIDTH + 20, y: Y_GEN2 };

    // Kakek Moyang di Gen 1
    // Khairi (ayah Abdul Ghani & Hanifah)
    positions['khairi'] = { x: (positions['abdul_ghani'].x + positions['hanifah'].x) / 2, y: Y_GEN1 };
    // Buang (ayah Madji)
    positions['buang'] = { x: positions['madji'].x, y: Y_GEN1 };

    branchBounds['Muchsin-Maryanah'] = {
      startX: 100,
      endX: totalWidth,
      midX: centralX,
    };
  } else {
    // Tata letak umum / per cabang
    // Dapatkan semua pilar Gen 3 yang aktif
    const gen3Pillars = displayedData.filter((p) => p.generation === 3 && p.parents.length > 0);
    let currentX = 100;

    gen3Pillars.forEach((pillar) => {
      const branchStartX = currentX;
      const gen4Children = displayedData.filter(
        (p) => p.generation === 4 && p.parents.includes(pillar.id)
      );

      if (gen4Children.length === 0) {
        positions[pillar.id] = { x: currentX, y: Y_GEN3 };
        if (pillar.spouses && pillar.spouses.length > 0) {
          const spId = pillar.spouses[0];
          if (displayedData.some(p => p.id === spId)) {
            positions[spId] = { x: currentX + UNIT_WIDTH, y: Y_GEN3 };
            currentX += UNIT_WIDTH * 2;
          } else {
            currentX += UNIT_WIDTH + 40;
          }
        } else {
          currentX += UNIT_WIDTH + 40;
        }
      } else {
        let gen4CurrentX = currentX;

        gen4Children.forEach((g4) => {
          const gen5Children = displayedData.filter(
            (p) => p.generation === 5 && p.parents.includes(g4.id)
          );

          let g4Width = UNIT_WIDTH;
          if (g4.spouses && g4.spouses.length > 0) {
            g4Width = UNIT_WIDTH * 2;
          }
          const gen5TotalWidth = Math.max(1, gen5Children.length) * UNIT_WIDTH;
          const blockWidth = Math.max(g4Width, gen5TotalWidth);

          const g4CenterX = gen4CurrentX + (blockWidth - g4Width) / 2;
          positions[g4.id] = { x: g4CenterX, y: Y_GEN4 };

          if (g4.spouses && g4.spouses.length > 0) {
            const spId = g4.spouses[0];
            positions[spId] = { x: g4CenterX + UNIT_WIDTH, y: Y_GEN4 };
          }

          let gen5CurrentX = gen4CurrentX;
          gen5Children.forEach((g5) => {
            const gen6Children = displayedData.filter(
              (p) => p.generation === 6 && p.parents.includes(g5.id)
            );

            positions[g5.id] = { x: gen5CurrentX, y: Y_GEN5 };

            if (g5.spouses && g5.spouses.length > 0) {
              const g5Spouse = g5.spouses[0];
              positions[g5Spouse] = { x: gen5CurrentX + UNIT_WIDTH, y: Y_GEN5 };
              gen5CurrentX += UNIT_WIDTH;
            }

            if (gen6Children.length > 0) {
              let gen6CurrentX = positions[g5.id].x;
              gen6Children.forEach((g6) => {
                positions[g6.id] = { x: gen6CurrentX, y: Y_GEN6 };
                gen6CurrentX += UNIT_WIDTH;
              });
            }

            gen5CurrentX += UNIT_WIDTH;
          });

          gen4CurrentX += blockWidth + 40;
        });

        const branchEndX = gen4CurrentX;
        const branchMidX = (branchStartX + branchEndX - CARD_WIDTH) / 2;

        positions[pillar.id] = { x: branchMidX - (pillar.spouses?.length > 0 ? UNIT_WIDTH / 2 : 0), y: Y_GEN3 };
        if (pillar.spouses && pillar.spouses.length > 0) {
          const spId = pillar.spouses[0];
          positions[spId] = { x: branchMidX + UNIT_WIDTH / 2, y: Y_GEN3 };
        }

        currentX = branchEndX + 80;
      }

      branchBounds[pillar.branch] = {
        startX: branchStartX,
        endX: currentX,
        midX: (branchStartX + currentX) / 2,
      };
    });

    const totalTreeWidth = Math.max(currentX, 1000);
    const centralX = totalTreeWidth / 2;

    // Gen 2
    if (displayedData.some(p => p.id === 'hanifah')) {
      positions['hanifah'] = { x: centralX - UNIT_WIDTH - 20, y: Y_GEN2 };
    }
    if (displayedData.some(p => p.id === 'madji')) {
      positions['madji'] = { x: centralX + 20, y: Y_GEN2 };
    }
    if (displayedData.some(p => p.id === 'abdul_ghani')) {
      positions['abdul_ghani'] = { x: centralX - UNIT_WIDTH * 2.2, y: Y_GEN2 };
    }
    if (displayedData.some(p => p.id === 'asyuro')) {
      positions['asyuro'] = { x: centralX - UNIT_WIDTH * 3.4, y: Y_GEN2 };
    }

    // Gen 1
    if (displayedData.some(p => p.id === 'khairi')) {
      positions['khairi'] = { x: positions['hanifah'] ? positions['hanifah'].x : centralX - 150, y: Y_GEN1 };
    }
    if (displayedData.some(p => p.id === 'buang')) {
      positions['buang'] = { x: positions['madji'] ? positions['madji'].x : centralX + 150, y: Y_GEN1 };
    }
  }

  // Bangun Nodes
  const nodes = displayedData.map((person) => {
    const isRoot = Boolean(person.root);
    const isSpouseOnly =
      (!person.parents || person.parents.length === 0) &&
      person.spouses &&
      person.spouses.length > 0;
    const role = person.role || (isRoot ? 'root' : isSpouseOnly ? 'spouse' : 'direct');

    const defaultPos = positions[person.id] || {
      x: (person.generation || 3) * 240,
      y: (person.generation || 3) * 220,
    };

    const matchesSearch = searchQuery
      ? person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (person.rawName && person.rawName.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;

    const isCousinParticipant =
      isCousinHighlight &&
      ['khairi', 'buang', 'abdul_ghani', 'hanifah', 'madji', 'muchsin', 'maryanah'].includes(person.id);

    return {
      id: person.id,
      type: 'personNode',
      position: defaultPos,
      draggable: false, // Terkunci rapi agar orang tua tidak panik/menggeser kotak sembarangan
      data: {
        ...person,
        role,
        isRoot,
        isSpouseOnly,
        isHighlighted: matchesSearch,
        isCousinParticipant,
        isFaded: !matchesSearch && !isCousinParticipant,
      },
    };
  });

  // Bangun Edges
  const edges = [];
  const processedSpouses = new Set();
  const displayedIds = new Set(displayedData.map((p) => p.id));

  // Sibling Edge (Khairi <-> Buang)
  if (displayedIds.has('khairi') && displayedIds.has('buang')) {
    edges.push({
      id: 'sibling-khairi-buang',
      source: 'khairi',
      target: 'buang',
      sourceHandle: 'right-center',
      targetHandle: 'left-center',
      type: 'siblingEdge',
      data: {
        label: 'Kakak - Beradik (Moyang)',
        isCousinParticipant: isCousinHighlight,
      },
      animated: isCousinHighlight,
      zIndex: 10,
    });
  }

  // Parent-Child Lineage Edges
  displayedData.forEach((person) => {
    if (person.parents && Array.isArray(person.parents)) {
      person.parents.forEach((parentId) => {
        if (displayedIds.has(parentId)) {
          const isParticipant =
            isCousinHighlight &&
            ((parentId === 'khairi' && (person.id === 'hanifah' || person.id === 'abdul_ghani')) ||
             (parentId === 'buang' && person.id === 'madji') ||
             (parentId === 'abdul_ghani' && person.id === 'muchsin') ||
             (parentId === 'hanifah' && person.id === 'maryanah') ||
             (parentId === 'madji' && person.id === 'maryanah'));

          edges.push({
            id: `lineage-${parentId}-${person.id}`,
            source: parentId,
            target: person.id,
            sourceHandle: 'bottom',
            targetHandle: 'top',
            type: 'lineageEdge',
            data: {
              isCousinParticipant: isParticipant,
            },
            animated: isParticipant,
            zIndex: 5,
          });
        }
      });
    }
  });

  // Spouse Edges
  displayedData.forEach((person) => {
    if (person.spouses && Array.isArray(person.spouses)) {
      person.spouses.forEach((spId) => {
        if (displayedIds.has(spId)) {
          const pairKey = [person.id, spId].sort().join('--');
          if (!processedSpouses.has(pairKey)) {
            processedSpouses.add(pairKey);

            const isSilang1 =
              (person.id === 'hanifah' && spId === 'madji') ||
              (person.id === 'madji' && spId === 'hanifah');

            const isSilang2 =
              (person.id === 'muchsin' && spId === 'maryanah') ||
              (person.id === 'maryanah' && spId === 'muchsin');

            const isCousin = isSilang1 || isSilang2 || isCousinMarriage(person.id, spId, allData);

            let sourceId = person.id;
            let targetId = spId;
            const pos1 = positions[person.id]?.x || 0;
            const pos2 = positions[spId]?.x || 0;
            if (pos1 > pos2) {
              sourceId = spId;
              targetId = person.id;
            }

            const isParticipant = isCousinHighlight && isCousin;

            let label = 'Pernikahan';
            let sublabel = 'Suami - Istri';
            if (isSilang1) {
              label = '💍 Silang 1: Hanifah & Madji';
              sublabel = 'Pernikahan Sepupu (Khairi & Buang)';
            } else if (isSilang2) {
              label = '💍 Silang 2: Muchsin & Maryanah';
              sublabel = 'Pernikahan Silang Cabang A & B';
            }

            edges.push({
              id: `spouse-${sourceId}-${targetId}`,
              source: sourceId,
              target: targetId,
              sourceHandle: 'right-center',
              targetHandle: 'left-center',
              type: 'marriageEdge',
              data: {
                isCousin,
                label,
                sublabel,
                isCousinParticipant: isParticipant,
              },
              animated: isCousin,
              zIndex: 15,
            });
          }
        }
      });
    }
  });

  const centralX = positions['muchsin'] && positions['maryanah']
    ? (positions['muchsin'].x + positions['maryanah'].x) / 2
    : 500;

  return { nodes, edges, branchBounds, centralX };
}
