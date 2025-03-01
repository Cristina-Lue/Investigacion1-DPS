// src/components/MomiiChatbot.js
import React, { useState } from 'react';
import Message from './Message';

const MomiiChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [waitingForFeedback, setWaitingForFeedback] = useState(false);

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    // Agregar el mensaje del usuario
    setMessages([...messages, { text: input, sender: 'user' }]);

    // Responder automáticamente con una respuesta basada en el input
    const botResponse = getBotResponse(input);
    setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: 'momii' }]);

    setInput('');
    setWaitingForFeedback(true);  // Esperando retroalimentación después de la respuesta

  };

  const getBotResponse = (input) => {
    // Convertimos la entrada a minúsculas para que sea insensible a mayúsculas y minúsculas
    const query = input.trim().toLowerCase();

    // Respuestas flexibles con "includes" o "match"
    if (query.includes('calendario académico')) {
      return 'Puedes consultar el calendario académico del semestre en el siguiente enlace: [Calendario Académico](https://www.udbvirtual.edu.sv/calendario). El calendario contiene las fechas importantes como inicio de clases, vacaciones, exámenes y más. Asegúrate de revisar las fechas correspondientes a tu programa.';
    } 
    if (query.includes('hola')) {
      return '¡Hola! ¿En qué puedo ayudarte hoy?';
    } 
    if (query.includes('horario de clases')) {
      return 'El horario de clases se puede revisar en el perfil académico dentro del portal [Portal Académico](https://admacad.udb.edu.sv/PortalWeb/). Ingresa con tus credenciales y en el lado derecho verás un cuadro que dice "Mi horario". Al presionar "Consultar", se generará tu horario de clases.';
    } 
    if (query.includes('períodos de inscripción')) {
      return 'Para conocer los períodos de inscripción para cursos, consulta las redes sociales de la universidad o acércate al edificio CDIU para más información.';
    } 
    if (query.includes('biblioteca')) {
      return 'El campus de Soyapango tiene dos bibliotecas. La Biblioteca Rafael Mesa Ayau se encuentra frente al edificio R, tiene 4 niveles y atiende de lunes a viernes de 7:00 AM a 5:00 PM y los sábados de 8:00 AM a 12:00 PM. La segunda biblioteca, que tiene una colección de libros, está al lado derecho de la capilla y tiene el mismo horario.';
    } 
    if (query.includes('servicios estudiantiles')) {
      return 'Puedes acercarte al edificio CDIU donde se encuentra el cajero del Banco Agrícola, allí podrás obtener más información.';
    }
    if (query.includes('evento importante')) {
      return 'Para conocer los eventos importantes en el campus, revisa las redes sociales de la universidad, donde se actualizan las actividades de la semana.';
    }
    if (query.includes('estrés') || query.includes('problemas emocionales')) {
      return 'Si estás experimentando estrés o problemas emocionales, puedes acercarte al departamento de Asistencia Psicopedagógica donde podrás hablar con psicólogos de la universidad.';
    }
    if (query.includes('discapacidad')) {
      return 'La universidad tiene rampas para facilitar la movilidad de los estudiantes con dificultades para caminar y un programa llamado "Sin Barreras", que enseña lengua de señas para facilitar la comunicación.';
    }
    if (query.includes('asesoramiento') || query.includes('tutoría')) {
      return 'Cada ciclo los docentes imparten tutorías en diferentes horarios. Para más información, consulta a tu docente. Además, en tu portal académico puedes ver tu tutor y la disponibilidad para resolver dudas.';
    }
    if (query.includes('pasantías') || query.includes('prácticas profesionales')) {
      return 'Para encontrar pasantías o prácticas profesionales, puedes comunicarte con tu director de escuela o contactar a la Lic. Paola Batles, quien dirige el programa de pasantías de la universidad.';
    }
    if (query.includes('currículum vitae')) {
      return 'El programa "Incorporate" ofrece un curso donde aprenderás desde la creación de tu currículum vitae hasta las entrevistas laborales. Puedes contactar a los encargados de este programa para más detalles.';
    }
    if (query.includes('entrevistas de trabajo')) {
      return 'Sí, el programa "Orientación de Carrera" dirigido por la Lic. Celina Juárez se imparte una vez por ciclo y incluye talleres como pruebas de polígrafo y otras actividades para ayudarte a prepararte para entrevistas de trabajo.';
    }
    if (query.includes('clubes') || query.includes('actividades extracurriculares')) {
      return 'Los clubes y actividades extracurriculares disponibles incluyen: Arte y Cultura, Pastoral Universitaria, Deportes, Voluntariado, Programa de Mujeres en Ciencia e Ingeniería, y las asociaciones de cada escuela.';
    }
    if (query.includes('fin de semana') || query.includes('actividad interesante')) {
      return 'Para conocer las actividades del fin de semana, consulta el calendario de eventos en el portal de la universidad o revisa las redes sociales para actualizaciones.';
    }
    if (query.includes('alimentación') || query.includes('cafetería')) {
      return 'La universidad cuenta con dos cafetines en el área de los laboratorios y cuatro más frente al Edificio C. Cada uno ofrece diferentes opciones de alimentos para los estudiantes.';
    }

    // Respuesta por defecto si no encuentra coincidencias
    return 'Lo siento, no entiendo esa pregunta. ¿Puedo ayudarte con algo más?';
  };

  const handleFeedback = (isHelpful) => {
    if (isHelpful) {
      setMessages((prevMessages) => [...prevMessages, { text: '¡Gracias por tu feedback! Me alegra haber sido útil.', sender: 'momii' }]);
    } else {
      setMessages((prevMessages) => [...prevMessages, { text: 'Lo siento si la respuesta no fue útil. ¿Puedo intentar de nuevo?', sender: 'momii' }]);
    }
    setWaitingForFeedback(false); // Deja de esperar retroalimentación
  };

  return (
    <div className="momii-chatbot">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} />
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe tu pregunta..."
      />
      <button onClick={handleSendMessage}>Enviar</button>

      {waitingForFeedback && (
        <div className="feedback">
          <p>¿Te fue útil la respuesta?</p>
          <button onClick={() => handleFeedback(true)}>Sí</button>
          <button onClick={() => handleFeedback(false)}>No</button>
        </div>
      )}
    </div>
  );
};

export default MomiiChatbot;
