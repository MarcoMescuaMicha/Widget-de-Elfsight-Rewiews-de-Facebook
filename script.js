// Función para obtener las reseñas de la página
async function fetchReviews() {
    try {
        // Obtener las páginas que el usuario administra
        const pagesResponse = await new Promise((resolve, reject) => {
            FB.api('/me/accounts', 'GET', response => {
                if (response && !response.error) {
                    resolve(response);
                } else {
                    reject(response.error || "Error desconocido");
                }
            });
        });
        
        const pages = pagesResponse.data;

        if (pages && pages.length > 0) {
            const pageId = pages[0].id; // Usar la primera página
            const accessToken = pages[0].access_token;

            // Obtener las reseñas de la página
            const reviewsResponse = await new Promise((resolve, reject) => {
                FB.api(`/${pageId}/ratings`, 'GET', { access_token: accessToken }, response => {
                    if (response && !response.error) {
                        resolve(response);
                    } else {
                        reject(response.error || "Error desconocido al obtener reseñas");
                    }
                });
            });

            const reviews = reviewsResponse.data;

            if (reviews && reviews.length > 0) {
                // Mostrar las reseñas en el widget
                showReviews(reviews);
            } else {
                document.getElementById('reviews-list').innerHTML = 
                    `<div class="alert alert-info text-center">No hay reseñas disponibles.</div>`;
            }
        } else {
            document.getElementById('reviews-list').innerHTML = 
                 `<div class="alert alert-warning text-center">No tienes páginas administradas.</div>`;

        }
    } catch (error) {
        console.error("Error al obtener reseñas:", error);
        document.getElementById('reviews-list').innerHTML = 
             `<div class="alert alert-danger text-center">Error al obtener reseñas: ${error.message || error}</div>`;

    }
}

// Función para mostrar las reseñas
function showReviews(reviews) {
    const reviewsList = document.getElementById('reviews-list');
    reviewsList.innerHTML = ""; // Limpiar el contenido anterior

    reviews.forEach(review => {
          const reviewHTML = `
            <div class="card shadow-sm mb-3">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <h5 class="mb-0">${review.reviewer?.name || "Usuario desconocido"}</h5>
                        <small class="text-warning">${"⭐".repeat(review.rating || 0)}</small>
                    </div>
                    <p class="text-muted mb-0">${review.review_text || "Sin comentario"}</p>
                </div>
            </div>
        `;
        reviewsList.appendChild(reviewDiv);
    });
}
