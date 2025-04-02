export async function loadComponent(name, targetElement) {
  try {
    const script = document.createElement('script');
    script.src = `/micro-components/${name}/remoteEntry.js`;
    script.type = 'text/javascript';

    await new Promise((resolve, reject) => {
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });

    if (window[`initialize${name.charAt(0).toUpperCase() + name.slice(1)}`]) {
      window[`initialize${name.charAt(0).toUpperCase() + name.slice(1)}`](targetElement);
    } else {
      console.error(`${name} komponenti için başlatma fonksiyonu bulunamadı`);
    }
  } catch (error) {
    console.error(`${name} komponenti yüklenirken hata oluştu:`, error);
    targetElement.innerHTML = `<div class="error">Komponent yüklenemedi: ${name}</div>`;
  }
}