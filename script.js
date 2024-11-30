
    // Function to generate a random pastel-like color
    function getRandomPastelColor() {
      const r = Math.floor((Math.random() * 127) + 127); // Ensures lighter shades for pastel colors
      const g = Math.floor((Math.random() * 127) + 127);
      const b = Math.floor((Math.random() * 127) + 127);
      return `rgb(${r}, ${g}, ${b})`;
    }

    // Change background color, quote box, and text styles dynamically
    function applyDynamicColors() {
      const bgColor = getRandomPastelColor();
      const quoteBoxColor = getRandomPastelColor();

      document.body.style.backgroundColor = bgColor;

      const quoteBox = document.querySelector('.quote-box');
      quoteBox.style.backgroundColor = quoteBoxColor;
    }

    // Generate random shapes with random colors and add them around the quote box
    function createShapes() {
      const shapes = ['circle', 'triangle', 'curly-line'];
      const body = document.body;

      for (let i = 0; i < 15; i++) {
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        const shape = document.createElement('div');
        shape.classList.add('shape', shapeType);

        // Randomize size, position, and color
        shape.style.backgroundColor = getRandomPastelColor();
        shape.style.color = getRandomPastelColor();
        shape.style.top = `${Math.random() * 100}vh`;
        shape.style.left = `${Math.random() * 100}vw`;
        shape.style.transform = `rotate(${Math.random() * 360}deg)`;

        // Size adjustments for different shapes
        if (shapeType === 'circle') {
          const size = Math.random() * 50 + 20;
          shape.style.width = `${size}px`;
          shape.style.height = `${size}px`;
        } else if (shapeType === 'triangle') {
          const size = Math.random() * 50 + 20;
          shape.style.borderBottomWidth = `${size}px`;
          shape.style.borderLeftWidth = `${size / 2}px`;
          shape.style.borderRightWidth = `${size / 2}px`;
        } else if (shapeType === 'curly-line') {
          shape.style.width = `${Math.random() * 100 + 50}px`;
        }

        body.appendChild(shape);
      }
    }

    // Fetch Quote from the API
    fetch('https://quotes-api-self.vercel.app/quote')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const quoteElement = document.querySelector('.quote');
        const authorElement = document.querySelector('.author');

        quoteElement.textContent = data.quote || "No quote available.";
        authorElement.textContent = data.author ? `— ${data.author}` : '';
      })
      .catch(error => {
        console.error('Error fetching the quote:', error);
        document.querySelector('.quote').textContent = "Failed to load quote.";
        document.querySelector('.author').textContent = '';
      });

    // Apply dynamic colors and initialize shapes
    applyDynamicColors();
    createShapes();
