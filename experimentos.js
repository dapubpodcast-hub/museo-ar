// Datos de los cuatro experimentos. "escala" ajusta el modelo al tamaño del sticker.
window.EXPERIMENTOS = {
  punto_ciego: { n: 1, titulo: 'El punto ciego', area: 'Óptica e ilusiones',
    pregunta: '¿Por qué un punto desaparece si lo miramos de reojo a cierta distancia?',
    escala: 2.0, y: 0.1 },
  evaporacion: { n: 2, titulo: 'Enfriamiento por evaporación', area: 'Calor',
    pregunta: '¿Por qué algo mojado se enfría cuando el agua se evapora?',
    escala: 6.0, y: 0.35 },
  uv: { n: 3, titulo: 'Rayos ultravioleta', area: 'Luz invisible',
    pregunta: '¿Cómo nos protegemos de una luz que no vemos?',
    escala: 1.6, y: 0.0 },
  remolino: { n: 4, titulo: 'Remolino en una botella', area: 'Viento y huracanes',
    pregunta: '¿Por qué el agua gira más rápido cuando se acerca al centro del remolino?',
    escala: 5.0, y: 0.5 }
};

// Red Astrobio · museo de satélites: modelos 3D con audio propio.
window.ASTROBIO = {
  sputnik1: { titulo: 'Sputnik 1', tema: 'El primer satélite artificial',
    texto: 'Lanzado por la Unión Soviética el 4 de octubre de 1957.',
    audio: 'audio/sputnik.mp3', escala: 2.5, y: 0.05 },
  tess: { titulo: 'TESS', tema: 'Un telescopio espacial que busca exoplanetas',
    texto: 'Satélite de la NASA, lanzado en 2018, que busca exoplanetas con el método de tránsito.',
    audio: 'audio/tess.mp3', escala: 2.5, y: 0.05 },
  chandrayaan2: { titulo: 'Chandrayaan-2', tema: 'Una misión a la Luna',
    texto: 'Misión de la agencia espacial de la India (ISRO), lanzada en 2019, con orbitador, módulo de aterrizaje y rover.',
    audio: 'audio/chandrayaan2.mp3', escala: 2.5, y: 0.05 }
};
