

document.addEventListener('DOMContentLoaded', () => {
    const albums = [
        { folder: '1', count: 45, type: 'image', description: 'Chuyên đề An toàn giao thông các năm tại trường THCS Hoàng Quốc Việt' },
        { folder: '2', count: 43, type: 'image', description: 'Sản phẩm vẽ tranh, thời trang an toàn giao thông của học sinh' },
        { folder: '3', count: 13, type: 'image', description: 'Khẩu hiệu và băng rôn tuyên truyền tại trường THCS Hoàng Quốc Việt' },
        { folder: '4', count: 5, type: 'image', description: 'Hình ảnh sắm vai và văn nghệ' },
        { folder: '5', count: 38, type: 'image', description: 'Sản phẩm bài thu hoạch và mô hình của học sinh' },
        { folder: '6', count: 3, type: 'image', description: 'Hình ảnh học sinh trước cổng trường Hoàng Quốc Việt' },
        { folder: '7', count: 17, type: 'image', description: 'Hình ảnh giải thưởng An toàn giao thông cho nụ cười ngày mai' },
        { folder: '8', count: 10, type: 'video', description: 'Các hoạt động tuyên truyền của trường Hoàng Quốc Việt' }
    ];

    let currentAlbumIndex = 0;
    let currentIndex = 1;

    const imageElement = document.getElementById('currentImage');
    const videoElement = document.getElementById('currentVideo');
    const descriptionElement = document.getElementById('description');

    function updateMedia() {
        const currentAlbum = albums[currentAlbumIndex];
        descriptionElement.textContent = currentAlbum.description;

        
        document.querySelectorAll('.media-element').forEach(el => el.classList.remove('active-media'));

        if (currentAlbum.type === 'image') {
            imageElement.src = `${currentAlbum.folder}/${currentIndex}.png`;
            imageElement.classList.add('active-media');
            imageElement.style.display = 'block';
            videoElement.style.display = 'none';
        } else if (currentAlbum.type === 'video') {
            videoElement.querySelector('source').src = `${currentAlbum.folder}/${currentIndex}.mp4`;
            videoElement.load();
            videoElement.classList.add('active-media');
            videoElement.style.display = 'block';
            imageElement.style.display = 'none';
        }
    }

    document.getElementById('leftArrow').addEventListener('click', () => {
        currentIndex--;
        if (currentIndex < 1) {
            if (currentAlbumIndex > 0) {
                currentAlbumIndex--;
                currentIndex = albums[currentAlbumIndex].count;
            } else {
                currentAlbumIndex = albums.length - 1;
                currentIndex = albums[currentAlbumIndex].count;
            }
        }
        updateMedia();
    });

    document.getElementById('rightArrow').addEventListener('click', () => {
        currentIndex++;
        if (currentIndex > albums[currentAlbumIndex].count) {
            currentAlbumIndex++;
            if (currentAlbumIndex >= albums.length) {
                currentAlbumIndex = 0;
            }
            currentIndex = 1;
        }
        updateMedia();
    });
    document.getElementById('nextSectionButton').addEventListener('click', () => {
        currentAlbumIndex++;
        if (currentAlbumIndex >= albums.length) {
            currentAlbumIndex = 0;
        }
        currentIndex = 1;
        updateMedia();
    });
    

    document.getElementById('skipButton').addEventListener('click', () => {
        if (confirm('Nếu bạn đã sẵn sàng, hãy thử thách với các câu đố sau')) {
            window.location.href = 'quizizz.html';
        }
    });

    
    updateMedia();
});