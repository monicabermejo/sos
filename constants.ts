import { Mission } from './types';

export const MISSIONS: Mission[] = [
  {
    id: 1,
    resource: 'water',
    emoji: '💧',
    colorClass: 'from-cyan-600 to-cyan-800',
    title: {
      ca: 'Missió 1 – L\'aigua fresca',
      es: 'Misión 1 – El agua fresca',
    },
    narrative: {
      ca: '☀️ Et despertes a la platja. La calorada és brutal. Trobes un manatial amagat entre les roques. Però necessites calcular quanta aigua pots emmagatzemar.',
      es: '☀️ Te despiertas en la playa. El calor es brutal. Encuentras un manantial oculto entre las rocas. Pero necesitas calcular cuánta agua puedes almacenar.',
    },
    challenge: {
      ca: '🪣 Un dipòsit d\'aigua té una capacitat total de <strong>15 litres</strong>. Actualment, el dipòsit conté una quantitat desconeguda d\'aigua (<em>x</em>). Si hi afegim <strong>un terç</strong> de la quantitat que ja hi ha dins, més <strong>7 litres</strong> addicionals, el dipòsit queda completament ple.<br/><br/>Quants litres d\'aigua hi havia inicialment?',
      es: '🪣 Un depósito de agua tiene una capacidad total de <strong>15 litros</strong>. Actualmente, el depósito contiene una cantidad desconocida de agua (<em>x</em>). Si añadimos <strong>un tercio</strong> de la cantidad que ya hay dentro, más <strong>7 litros</strong> adicionales, el depósito queda completamente lleno.<br/><br/>¿Cuántos litros de agua había inicialmente?',
    },
    equation: 'x + x/3 + 7 = 15',
    expectedAnswer: '6',
    hints: {
      ca: [
        '💡 Identifica les tres parts que omplen el dipòsit: la quantitat inicial (x), un terç d\'aquesta quantitat (x/3) i 7 litres més. La suma ha de ser igual a 15.',
        '💡 Escriu l\'equació: x + x/3 + 7 = 15. Primer resta 7 als dos costats: x + x/3 = 8. Ara suma les fraccions: 3x/3 + x/3 = 4x/3.',
        '💡 Tens 4x/3 = 8. Multiplica els dos costats per 3: 4x = 24. Ara divideix per 4 i trobaràs x.',
      ],
      es: [
        '💡 Identifica las tres partes que llenan el depósito: la cantidad inicial (x), un tercio de esa cantidad (x/3) y 7 litros más. La suma debe igual 15.',
        '💡 Escribe la ecuación: x + x/3 + 7 = 15. Primero resta 7 a ambos lados: x + x/3 = 8. Ahora suma las fracciones: 3x/3 + x/3 = 4x/3.',
        '💡 Tienes 4x/3 = 8. Multiplica ambos lados por 3: 4x = 24. Ahora divide por 4 y encontrarás x.',
      ],
    },
    feedback: {
      wrong: {
        ca: 'Hmm, no és correcte. Rellègeix l\'enunciat i torna a intentar-ho. Escriu "pista" si necessites ajuda.',
        es: 'Hmm, eso no es correcto. Relee el enunciado y vuelve a intentarlo. Escribe "pista" si necesitas ayuda.',
      },
      correct: {
        ca: '💧 Excel·lent! Hi havia 6 litres. 6 + 6/3 + 7 = 6 + 2 + 7 = 15 litres. Dipòsit ple! L\'aigua és teva! +1 dia de supervivència!',
        es: '💧 ¡Excelente! Había 6 litros. 6 + 6/3 + 7 = 6 + 2 + 7 = 15 litros. ¡Depósito lleno! ¡El agua es tuya! ¡+1 día de supervivencia!',
      },
    },
  },
  {
    id: 2,
    resource: 'shelter',
    emoji: '🏚️',
    colorClass: 'from-amber-700 to-amber-900',
    title: {
      ca: 'Missió 2 – El refugi',
      es: 'Misión 2 – El refugio',
    },
    narrative: {
      ca: '🌩️ S\'acosta una tempesta. Necessites construir un refugi ràpidament. Busques troncs per les parets i el sostre, i has de calcular quants falta per acabar.',
      es: '🌩️ Se acerca una tormenta. Necesitas construir un refugio rápidamente. Buscas troncos para las paredes y el techo, y debes calcular cuántos faltan para terminar.',
    },
    challenge: {
      ca: '🪵 Per construir el refugi necessites <strong>parets</strong> i <strong>sostre</strong>. Saps que el sostre requereix el <strong>quàdruple</strong> de troncs que les parets. Si entre les dues parts (parets + sostre) necessites un total de <strong>30 troncs</strong>, quants troncs s\'utilitzen per a les parets i quants per al sostre?<br/><br/>Escriu les dues respostes separades per comes: <em>parets, sostre</em>',
      es: '🪵 Para construir el refugio necesitas <strong>paredes</strong> y <strong>techo</strong>. Sabes que el techo requiere el <strong>cuádruple</strong> de troncos que las paredes. Si entre las dos partes (paredes + techo) necesitas un total de <strong>30 troncos</strong>, ¿cuántos troncos se usan para las paredes y cuántos para el techo?<br/><br/>Escribe las dos respuestas separadas por comas: <em>paredes, techo</em>',
    },
    equation: 'x + 4x = 30',
    expectedAnswer: '6,24',
    hints: {
      ca: [
        '💡 Anomena x els troncs de les parets. El sostre és el quàdruple, és a dir, 4x. Junts sumen 30: pots escriure x + 4x = 30.',
        '💡 x + 4x = 5x. Per tant 5x = 30. Divideix els dos costats per 5 per trobar x (parets).',
        '💡 5x = 30 → x = 6 (parets). El sostre és 4 × 6 = 24. Escriu: 6, 24',
      ],
      es: [
        '💡 Llama x a los troncos de las paredes. El techo es el cuádruple, es decir, 4x. Juntos suman 30: puedes escribir x + 4x = 30.',
        '💡 x + 4x = 5x. Por tanto 5x = 30. Divide ambos lados por 5 para encontrar x (paredes).',
        '💡 5x = 30 → x = 6 (paredes). El techo es 4 × 6 = 24. Escribe: 6, 24',
      ],
    },
    feedback: {
      wrong: {
        ca: 'No és correcte. Recorda que has de donar els dos valors separats per comes: parets, sostre. Escriu "pista" si necessites ajuda.',
        es: 'No es correcto. Recuerda que debes dar los dos valores separados por comas: paredes, techo. Escribe "pista" si necesitas ayuda.',
      },
      correct: {
        ca: '🏚️ Perfecte! 6 troncs per a les parets i 24 per al sostre. 6 + 24 = 30 troncs en total. El refugi és teu just abans de la tempesta! +1 dia de supervivència!',
        es: '🏚️ ¡Perfecto! 6 troncos para las paredes y 24 para el techo. 6 + 24 = 30 troncos en total. ¡El refugio es tuyo justo antes de la tormenta! ¡+1 día de supervivencia!',
      },
    },
  },
  {
    id: 3,
    resource: 'fire',
    emoji: '🔥',
    colorClass: 'from-orange-600 to-red-800',
    title: {
      ca: 'Missió 3 – El foc de senyals',
      es: 'Misión 3 – El fuego de señales',
    },
    narrative: {
      ca: '✈️ Has vist una ombra d\'avió al cel! Si encens un foc de senyals gran, potser et veuen. Necessites troncs de combustible, però has de calcular exactament quants.',
      es: '✈️ ¡Has visto una sombra de avión en el cielo! Si enciendes un fuego de señales grande, quizás te ven. Necesitas troncos de combustible, pero debes calcular exactamente cuántos.',
    },
    challenge: {
      ca: '🪵 Quan vas encendre el foc, tenies una pila de troncs. El foc consumeix <strong>3 troncs cada hora</strong>. Després de <strong>4 hores</strong> cremant, observes que el que et queda a la pila és exactament la <strong>quarta part</strong> dels troncs que tenies al principi.<br/><br/>Quants troncs tenies inicialment?',
      es: '🪵 Cuando encendiste el fuego, tenías una pila de troncos. El fuego consume <strong>3 troncos por hora</strong>. Tras <strong>4 horas</strong> ardiendo, observas que lo que te queda en la pila es exactamente la <strong>cuarta parte</strong> de los troncos que tenías al principio.<br/><br/>¿Cuántos troncos tenías inicialmente?',
    },
    equation: 'x - 12 = x/4',
    expectedAnswer: '16',
    hints: {
      ca: [
        '💡 Anomena x els troncs inicials. Després de 4 hores s\'han cremat 3×4 = 12 troncs. El que queda (x - 12) és la quarta part de x. Pots escriure: x - 12 = x/4.',
        '💡 Multiplica els dos costats per 4: 4x - 48 = x. Ara passa la x del costat dret: 4x - x = 48, és a dir 3x = 48.',
        '💡 3x = 48 → x = 48 ÷ 3 = ? Aquí tens la resposta.',
      ],
      es: [
        '💡 Llama x a los troncos iniciales. Después de 4 horas se han quemado 3×4 = 12 troncos. Lo que queda (x - 12) es la cuarta parte de x. Puedes escribir: x - 12 = x/4.',
        '💡 Multiplica ambos lados por 4: 4x - 48 = x. Ahora pasa la x del lado derecho: 4x - x = 48, es decir 3x = 48.',
        '💡 3x = 48 → x = 48 ÷ 3 = ? Ahí tienes la respuesta.',
      ],
    },
    feedback: {
      wrong: {
        ca: 'No és correcte. Rellègeix l\'enunciat i recorda que el que queda ha de ser la quarta part dels troncs inicials. Escriu "pista" si necessites ajuda.',
        es: 'No es correcto. Relee el enunciado y recuerda que lo que queda debe ser la cuarta parte de los troncos iniciales. Escribe "pista" si necesitas ayuda.',
      },
      correct: {
        ca: '🔥 Perfecte! Tenies 16 troncs. 16 - 12 = 4 restants, que és exactament 16/4. El foc crema alt! Potser algú et veu! +1 dia de supervivència!',
        es: '🔥 ¡Perfecto! Tenías 16 troncos. 16 - 12 = 4 restantes, que es exactamente 16/4. ¡El fuego arde alto! ¡Quizás alguien te ve! ¡+1 día de supervivencia!',
      },
    },
  },
  {
    id: 4,
    resource: 'food',
    emoji: '🥥',
    colorClass: 'from-green-700 to-emerald-900',
    title: {
      ca: 'Missió 4 – La recol·lecta de menjar',
      es: 'Misión 4 – La recolecta de comida',
    },
    narrative: {
      ca: '🌴 L\'estómac et crida. Trobes un arbre de cocos i un niu de fruita tropical. Necessites repartir la menjar de forma equitativa per sobreviure els propers dies.',
      es: '🌴 El estómago te ruge. Encuentras un árbol de cocos y un nido de frutas tropicales. Necesitas repartir la comida de forma equitativa para sobrevivir los próximos días.',
    },
    challenge: {
      ca: '🍌 Has recollit <strong>17 cocos</strong> en total. Vols repartir-los en <strong>3 munts iguals</strong> per als propers dies, però en sobren <strong>2</strong> que no encaixen en cap munt. <br/><br/>Quants cocos hi ha en cada munt?',
      es: '🍌 Has recolectado <strong>17 cocos</strong> en total. Quieres repartirlos en <strong>3 montones iguales</strong> para los próximos días, pero sobran <strong>2</strong> que no caben en ningún montón. <br/><br/>¿Cuántos cocos hay en cada montón?',
    },
    equation: '3x + 2 = 17',
    expectedAnswer: '5',
    hints: {
      ca: [
        '💡 Pensa: 3 munts iguals més 2 sobrants fan 17 en total. Quina quantitat desconeguda és la mida de cada munt?',
        '💡 Resta els 2 sobrants: 17 - 2 = 15 cocos. Ara tens 15 cocos repartits en 3 munts iguals.',
        '💡 15 ÷ 3 = ? Aquí tens la mida de cada munt.',
      ],
      es: [
        '💡 Piensa: 3 montones iguales más 2 sobrantes hacen 17 en total. ¿Cuál es la cantidad desconocida, el tamaño de cada montón?',
        '💡 Resta los 2 sobrantes: 17 - 2 = 15 cocos. Ahora tienes 15 cocos repartidos en 3 montones iguales.',
        '💡 15 ÷ 3 = ? Ahí tienes el tamaño de cada montón.',
      ],
    },
    feedback: {
      wrong: {
        ca: 'No és correcte. Rellègeix com es reparteixen els cocos. Escriu "pista" si necessites ajuda.',
        es: 'No es correcto. Relee cómo se reparten los cocos. Escribe "pista" si necesitas ayuda.',
      },
      correct: {
        ca: '🥥 Excel·lent! 3 × 5 + 2 = 17. Cada grup té 5 cocos. Menjar assegurat per avui!',
        es: '🥥 ¡Excelente! 3 × 5 + 2 = 17. Cada grupo tiene 5 cocos. ¡Comida asegurada por hoy!',
      },
    },
  },
  {
    id: 5,
    resource: 'medicine',
    emoji: '🌿',
    colorClass: 'from-teal-600 to-teal-900',
    title: {
      ca: 'Missió 5 – El remei medicinal',
      es: 'Misión 5 – El remedio medicinal',
    },
    narrative: {
      ca: '🤒 Et piquen uns insectes i tens una infecció lleu. A la selva trobes plantes medicinals. La recepta que recordes de classe de biologia et demana calcular la dosi exacta.',
      es: '🤒 Unos insectos te pican y tienes una infección leve. En la selva encuentras plantas medicinales. La receta que recuerdas de clase de biología te pide calcular la dosis exacta.',
    },
    challenge: {
      ca: '🫙 La recepta del remei diu: mescla una certa quantitat de planta amb <strong>el triple d\'aquella mateixa quantitat d\'aigua</strong>. La mescla resultant ha de ser exactament de <strong>24 ml</strong> en total. <br/><br/>Quants ml de planta has de fer servir?',
      es: '🫙 La receta del remedio dice: mezcla una cierta cantidad de planta con <strong>el triple de esa misma cantidad de agua</strong>. La mezcla resultante debe ser exactamente de <strong>24 ml</strong> en total. <br/><br/>¿Cuántos ml de planta debes usar?',
    },
    equation: 'x + 3x = 24',
    expectedAnswer: '6',
    hints: {
      ca: [
        '💡 Anomèna la quantitat de planta com a incògnita. Llavors l\'aigua és 3 vegades aquella quantitat. Suma les dues parts: incògnita + 3 × incògnita.',
        '💡 Incògnita + 3 × incògnita = 4 × incògnita. Ara saps que 4 vegades la incògnita és 24.',
        '💡 24 ÷ 4 = ? Aquí tens la quantitat de planta.',
      ],
      es: [
        '💡 Llama incógnita a la cantidad de planta. Entonces el agua es 3 veces esa cantidad. Suma las dos partes: incógnita + 3 × incógnita.',
        '💡 Incógnita + 3 × incógnita = 4 × incógnita. Ahora sabes que 4 veces la incógnita es 24.',
        '💡 24 ÷ 4 = ? Ahí tienes la cantidad de planta.',
      ],
    },
    feedback: {
      wrong: {
        ca: 'No és correcte. Rellègeix les proporcions de la recepta. Escriu "pista" si necessites ajuda.',
        es: 'No es correcto. Relee las proporciones de la receta. Escribe "pista" si necesitas ayuda.',
      },
      correct: {
        ca: '🌿 Perfecte! 6 + 18 = 24 ml. El remei és a punt. Ja et trobes millor!',
        es: '🌿 ¡Perfecto! 6 + 18 = 24 ml. El remedio está listo. ¡Ya te sientes mejor!',
      },
    },
  },
  {
    id: 6,
    resource: 'raft',
    emoji: '🛶',
    colorClass: 'from-yellow-600 to-orange-800',
    title: {
      ca: 'Missió 6 – La balsa de rescat',
      es: 'Misión 6 – La balsa de rescate',
    },
    narrative: {
      ca: '⚓ Si ningú ve els teus senyals, hauràs de navegar cap a la civlització! Comences a construir la balsa. Necessites calcular quants troncs més has de buscar.',
      es: '⚓ Si nadie ve tus señales, ¡tendrás que navegar hacia la civilización! Empiezas a construir la balsa. Necesitas calcular cuántos troncos más debes buscar.',
    },
    challenge: {
      ca: '🪵 La balsa necessita exactament <strong>20 troncs</strong>. Ahir vas anar a la selva i vas portar un carregament de troncs. Amb aquests nous troncs, ara tens el <strong>doble</strong> de la quantitat que tenies originalment al campament. Si després de sumar-ho tot, encara et <strong>falten 4 troncs</strong> per arribar als 20, quants troncs tenies al principi?',
      es: '🪵 La balsa necesita exactamente <strong>20 troncos</strong>. Ayer fuiste a la selva y trajiste un cargamento de troncos. Con estos nuevos troncos, ahora tienes el <strong>doble</strong> de la cantidad que tenías originalmente en el campamento. Si después de sumarlo todo, todavía te <strong>faltan 4 troncos</strong> para llegar a 20, ¿cuántos troncos tenías al principio?',
    },
    equation: '2x + 4 = 20',
    expectedAnswer: '8',
    hints: {
      ca: [
        '💡 Anomena x els troncs que tenies al principi. Vas portar la mateixa quantitat (x), de manera que ara tens x + x = 2x troncs. Però et falten 4 per arribar a 20.',
        '💡 Escriu l\'equació: 2x + 4 = 20. Primer resta 4 als dos costats per aïllar el terme amb x: 2x = 16.',
        '💡 2x = 16 → x = 16 ÷ 2 = ? Aquí tens els troncs inicials.',
      ],
      es: [
        '💡 Llama x a los troncos que tenías al principio. Trajiste la misma cantidad (x), de modo que ahora tienes x + x = 2x troncos. Pero te faltan 4 para llegar a 20.',
        '💡 Escribe la ecuación: 2x + 4 = 20. Primero resta 4 a ambos lados para aislar el término con x: 2x = 16.',
        '💡 2x = 16 → x = 16 ÷ 2 = ? Ahí tienes los troncos iniciales.',
      ],
    },
    feedback: {
      wrong: {
        ca: 'No és correcte. Recorda que ara tens el doble dels troncs inicials i encara et falten 4. Escriu "pista" si necessites ajuda.',
        es: 'No es correcto. Recuerda que ahora tienes el doble de los troncos iniciales y aún te faltan 4. Escribe "pista" si necesitas ayuda.',
      },
      correct: {
        ca: '🛶 Increïble! Tenies 8 troncs. 8 + 8 = 16, i 16 + 4 = 20. La balsa és a punt! Aviat podràs navegar! +1 dia de supervivència!',
        es: '🛶 ¡Increíble! Tenías 8 troncos. 8 + 8 = 16, y 16 + 4 = 20. ¡La balsa está lista! ¡Pronto podrás navegar! ¡+1 día de supervivencia!',
      },
    },
  },
  {
    id: 7,
    resource: 'signal',
    emoji: '🆘',
    colorClass: 'from-red-600 to-rose-900',
    title: {
      ca: 'Missió 7 – El senyal S.O.S.',
      es: 'Misión 7 – La señal S.O.S.',
    },
    narrative: {
      ca: '📡 Decideixes fer un senyal S.O.S. enorme a la platja amb pedres. A la vista des de l\'aire, cada lletra ha de ser perfecta. Calcules les pedres que necessites.',
      es: '📡 Decides hacer una señal S.O.S. enorme en la playa con piedras. Vista desde el aire, cada letra debe ser perfecta. Calculas las piedras que necesitas.',
    },
    challenge: {
      ca: '🪨 Construeixes les lletres S·O·S amb pedres a la sorra. Les <strong>dues S</strong> necessiten el <strong>mateix nombre de pedres</strong> cadascuna. La <strong>O</strong> necessita <strong>3 pedres menys</strong> que cada S. Has comptat que en total fas servir <strong>27 pedres</strong>. <br/><br/>Quantes pedres necessita cada S?',
      es: '🪨 Construyes las letras S·O·S con piedras en la arena. Las <strong>dos S</strong> necesitan el <strong>mismo número de piedras</strong> cada una. La <strong>O</strong> necesita <strong>3 piedras menos</strong> que cada S. Has contado que en total usas <strong>27 piedras</strong>. <br/><br/>¿Cuántas piedras necesita cada S?',
    },
    equation: '2x + (x - 3) = 27',
    expectedAnswer: '10',
    hints: {
      ca: [
        '💡 Anomena "a" les pedres de cada S. Aleshores la O té (a - 3) pedres. El total és: S + O + S = a + (a-3) + a = 27.',
        '💡 Simplifica la suma: a + a + a - 3 = 3a - 3 = 27. Ara suma 3 als dos costats.',
        '💡 3a = 30. Divideix entre 3: a = 30 ÷ 3 = ?',
      ],
      es: [
        '💡 Llama "a" a las piedras de cada S. Entonces la O tiene (a - 3) piedras. El total es: S + O + S = a + (a-3) + a = 27.',
        '💡 Simplifica la suma: a + a + a - 3 = 3a - 3 = 27. Ahora suma 3 a ambos lados.',
        '💡 3a = 30. Divide entre 3: a = 30 ÷ 3 = ?',
      ],
    },
    feedback: {
      wrong: {
        ca: 'No és correcte. Rellègeix com estan distribuïdes les pedres del S.O.S. Escriu "pista".',
        es: 'No es correcto. Relee cómo están distribuidas las piedras del S.O.S. Escribe "pista".',
      },
      correct: {
        ca: '🆘 PERFECTE! x=10, O necessita 7. 10+7+10=27. El S.O.S. és visible des de l\'aire!',
        es: '🆘 ¡PERFECTO! x=10, O necesita 7. 10+7+10=27. ¡El S.O.S. es visible desde el aire!',
      },
    },
  },
  {
    id: 8,
    resource: 'rescue',
    emoji: '🚢',
    colorClass: 'from-blue-500 to-indigo-800',
    title: {
      ca: 'Missió 8 – El rescat!',
      es: 'Misión 8 – ¡El rescate!',
    },
    narrative: {
      ca: '🚢 UN VAIXELL A L\'HORITZÓ! Pots veure un fum de motor. El vaixell i tu us moveu l\'un cap a l\'altre. Has de calcular a quina distàcia és per avisar als rescatadors per ràdio!',
      es: '🚢 ¡UN BARCO EN EL HORIZONTE! Puedes ver humo de motor. El barco y tú os movéis el uno hacia el otro. ¡Debes calcular a qué distancia está para avisar a los rescatadores por radio!',
    },
    challenge: {
      ca: '⚓ El vaixell emet un pitit de ràdio de forma regular i repetida. Has estat escoltant durant <strong>45 minuts</strong> i has comptat exactament <strong>9 pitits</strong>, tots separats pel mateix interval de temps. <br/><br/>Cada quants minuts sona un pitit?',
      es: '⚓ El barco emite un pitido de radio de forma regular y repetida. Has estado escuchando durante <strong>45 minutos</strong> y has contado exactamente <strong>9 pitidos</strong>, todos separados por el mismo intervalo de tiempo. <br/><br/>¿Cada cuántos minutos suena un pitido?',
    },
    equation: '9x = 45',
    expectedAnswer: '5',
    hints: {
      ca: [
        '💡 Si cada pitit triga el mateix temps i en total n\'hi ha 9 en 45 minuts, quin tipus d\'operació et dóna el temps de cada pitit?',
        '💡 9 intervals × (minuts per interval) = 45 minuts totals. Despeja els minuts per interval.',
        '💡 45 ÷ 9 = ? Aquí tens la resposta.',
      ],
      es: [
        '💡 Si cada pitido tarda el mismo tiempo y en total hay 9 en 45 minutos, ¿qué operación te da el tiempo de cada pitido?',
        '💡 9 intervalos × (minutos por intervalo) = 45 minutos totales. Despeja los minutos por intervalo.',
        '💡 45 ÷ 9 = ? Ahí tienes la respuesta.',
      ],
    },
    feedback: {
      wrong: {
        ca: 'No és correcte. Rellègeix les dades del pitit del vaixell. Escriu "pista" si necessites ajuda.',
        es: 'No es correcto. Relee los datos del pitido del barco. Escribe "pista" si necesitas ayuda.',
      },
      correct: {
        ca: '🚢🎉 x = 5! CADA 5 MINUTS! Has calculat la freqüència exacta. ESTÀS RESCATAT/DA! ENHORABONA!',
        es: '🚢🎉 ¡x = 5! ¡CADA 5 MINUTOS! Has calculado la frecuencia exacta. ¡ESTÁS RESCATADO/A! ¡ENHORABUENA!',
      },
    },
  },
];

export const STORAGE_KEY = 'sos_isla_x_progress';
export const STORAGE_VERSION = 2;

export const UI_STRINGS = {
  appTitle: { ca: 'S.O.S. Illa X', es: 'S.O.S. Isla X' },
  day: { ca: 'Dia', es: 'Día' },
  daysOnIsland: { ca: 'dies a l\'illa', es: 'días en la isla' },
  resources: { ca: 'Recursos', es: 'Recursos' },
  missions: { ca: 'Missions', es: 'Misiones' },
  completed: { ca: 'Completada', es: 'Completada' },
  pending: { ca: 'Pendent', es: 'Pendiente' },
  inputPlaceholder: { ca: 'Escriu el valor de x... (o "pista")', es: 'Escribe el valor de x... (o "pista")' },
  send: { ca: 'Enviar', es: 'Enviar' },
  hint: { ca: 'pista', es: 'pista' },
  hintUsed: { ca: '💡 Pista generada por IA:', es: '💡 Pista generada por IA:' },
  missionSidebar: { ca: 'Les teves missions', es: 'Tus misiones' },
  progressLabel: { ca: 'Progressió', es: 'Progreso' },
  helpTitle: { ca: 'Com funciona?', es: '¿Cómo funciona?' },
  helpSteps: {
    ca: [
      { icon: 'fa-island-tropical', title: 'Ets a una illa', desc: 'Has naufragat! Completa missions per sobreviure i ser rescatat.' },
      { icon: 'fa-calculator', title: 'Resol equacions', desc: 'Cada missió et presenta una equació de primer grau. Troba el valor de x.' },
      { icon: 'fa-lightbulb', title: 'Demana pistes', desc: 'Escriu "pista" per rebre ajuda. La IA t\'ajudarà pas a pas.' },
      { icon: 'fa-trophy', title: 'Aconsegueix recursos', desc: 'Cada equació resolta et dona un recurs de supervivència fins al rescat!' },
    ],
    es: [
      { icon: 'fa-island-tropical', title: 'Estás en una isla', desc: '¡Has naufragado! Completa misiones para sobrevivir y ser rescatado.' },
      { icon: 'fa-calculator', title: 'Resuelve ecuaciones', desc: 'Cada misión te presenta una ecuación de primer grado. Encuentra el valor de x.' },
      { icon: 'fa-lightbulb', title: 'Pide pistas', desc: 'Escribe "pista" para recibir ayuda. La IA te guiará paso a paso.' },
      { icon: 'fa-trophy', title: 'Consigue recursos', desc: '¡Cada ecuación resuelta te da un recurso de supervivencia hasta el rescate!' },
    ],
  },
  rescued: {
    ca: '🎉 RESCATADA/RESCATAT! Has superat totes les missions i has sortit de l\'illa! Ets una autèntica experta en equacions!',
    es: '🎉 ¡RESCATADO/A! ¡Has superado todas las misiones y has salido de la isla! ¡Eres un auténtico experto en ecuaciones!',
  },
  restartBtn: { ca: 'Nova aventura', es: 'Nueva aventura' },
  missionIntro: {
    ca: (missionTitle: string) => `🗺️ Nova missió desblocada: **${missionTitle}**`,
    es: (missionTitle: string) => `🗺️ Nueva misión desbloqueada: **${missionTitle}**`,
  },
};

export const RESOURCE_LABELS: Record<string, Record<'ca' | 'es', string>> = {
  water:    { ca: 'Aigua',    es: 'Agua'      },
  shelter:  { ca: 'Refugi',   es: 'Refugio'   },
  fire:     { ca: 'Foc',      es: 'Fuego'     },
  food:     { ca: 'Menjar',   es: 'Comida'    },
  medicine: { ca: 'Medicina', es: 'Medicina'  },
  raft:     { ca: 'Balsa',    es: 'Balsa'     },
  signal:   { ca: 'Senyal',   es: 'Señal'     },
  rescue:   { ca: 'Rescat!',  es: '¡Rescate!' },
};
