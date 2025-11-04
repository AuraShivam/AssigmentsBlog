document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('imageUploadInput');
  const container = document.getElementById('uploadedImages');
  if (!input || !container) return;

  input.addEventListener('change', () => {
    container.innerHTML = '';
    let storedImages = JSON.parse(localStorage.getItem('uploadedImages') || '[]');

    Array.from(input.files).forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = e => {
        const img = document.createElement('img');
        img.src = e.target.result;
        container.appendChild(img);

        // Add image to localStorage array if not already stored
        if(!storedImages.includes(e.target.result)) {
          storedImages.push(e.target.result);
          localStorage.setItem('uploadedImages', JSON.stringify(storedImages));
        }
      };
      reader.readAsDataURL(file);
    });
  });
});
