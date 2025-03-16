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
                document.getElementById('reviews-list').innerHTML = "<p>No hay reseñas disponibles.</p>";
            }
        } else {
            document.getElementById('reviews-list').innerHTML = "<p>No tienes páginas administradas.</p>";
        }
    } catch (error) {
        console.error("Error al obtener reseñas:", error);
        document.getElementById('reviews-list').innerHTML = `<p>Error al obtener reseñas: ${error.message || error}</p>`;
    }
}

// Función para mostrar las reseñas
function showReviews(reviews) {
    const reviewsList = document.getElementById('reviews-list');
    reviewsList.innerHTML = ""; // Limpiar el contenido anterior

    reviews.forEach(review => {
        const reviewDiv = document.createElement("div");
        reviewDiv.className = "review";
        reviewDiv.innerHTML = `
            <div class="review-header">
                <span class="review-author">${review.reviewer?.name || "Usuario desconocido"}</span>
                <span class="review-rating">${"⭐".repeat(review.rating || 0)}</span>
            </div>
            <p class="review-comment">${review.review_text || "Sin comentario"}</p>
        `;
        reviewsList.appendChild(reviewDiv);
    });
}
