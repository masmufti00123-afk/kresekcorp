// =====================================
// KRESEKCORP NEWS SYSTEM
// FINAL VERSION
// =====================================


let beritaData = [];




// =====================================
// LOAD DATA BERITA
// =====================================


async function loadBerita(){


    try{


        const response = await fetch(
            "data/berita.json"
        );



        if(!response.ok){


            throw new Error(
                "File berita.json tidak ditemukan"
            );


        }




        beritaData = await response.json();




        if(
            document.getElementById(
                "headline-news"
            )
        ){

            tampilkanHomepage();

        }




        if(
            document.getElementById(
                "article-detail"
            )
        ){

            tampilkanArtikel();

        }




    }
    catch(error){


        console.error(
            "Gagal membaca berita:",
            error
        );


    }



}







// =====================================
// HOMEPAGE
// =====================================


function tampilkanHomepage(){


    tampilkanBeritaUtama();


    tampilkanBeritaTerbaru();


    tampilkanBeritaPopuler();


    tampilkanKategori();


    tampilkanVideo();


    tampilkanGaleri();



}







// =====================================
// BERITA UTAMA
// =====================================


function tampilkanBeritaUtama(){


    const container =
    document.getElementById(
        "headline-news"
    );



    if(!container) return;




    const berita =
    beritaData[0];



    if(!berita) return;




    container.innerHTML = `


        <img src="${berita.thumbnail}">



        <div class="hero-overlay">



            <span class="badge">

                ${berita.kategori}

            </span>




            <h1>

                ${berita.title}

            </h1>




            <p>

                ${berita.excerpt}

            </p>



        </div>



    `;





    container.onclick=function(){


        bukaBerita(
            berita.slug
        );


    };



}








// =====================================
// BERITA TERBARU
// =====================================


function tampilkanBeritaTerbaru(){


    const container =
    document.getElementById(
        "latest-news"
    );



    if(!container) return;



    container.innerHTML="";




    beritaData
    .slice(0,6)
    .forEach(
        berita=>{



        container.innerHTML += `


        <article

        class="news-card"

        onclick="bukaBerita('${berita.slug}')">


            <img src="${berita.thumbnail}">





            <div class="news-content">



                <span class="news-category">

                    ${berita.kategori}

                </span>





                <h3>

                    ${berita.title}

                </h3>





                <p>

                    ${berita.excerpt}

                </p>





            </div>



        </article>



        `;



    });



}







// =====================================
// BERITA POPULER HOMEPAGE
// =====================================


function tampilkanBeritaPopuler(){


    const container =
    document.getElementById(
        "popular-news"
    );



    if(!container) return;




    container.innerHTML="";





    beritaData
    .slice(0,5)
    .forEach(
        (berita,index)=>{





        container.innerHTML += `


        <div class="popular-item">



            <span class="popular-number">

                ${index + 1}

            </span>





            <div class="popular-title">


                ${berita.title}



            </div>




        </div>



        `;



    });



}







// =====================================
// FORMAT TANGGAL INDONESIA
// =====================================


function formatTanggal(tanggal){


    if(!tanggal) return "";



    const date =
    new Date(tanggal);




    return date.toLocaleDateString(

        "id-ID",

        {

            weekday:"long",

            day:"numeric",

            month:"long",

            year:"numeric"


        }

    );


}// =====================================
// KATEGORI BERITA
// =====================================


function tampilkanKategori(){


    const kategori = [


        {
            nama:"Event",
            id:"event-news"
        },


        {
            nama:"Hiburan",
            id:"hiburan-news"
        },


        {
            nama:"Informasi",
            id:"informasi-news"
        },


        {
            nama:"Produksi",
            id:"produksi-news"
        }


    ];




    kategori.forEach(item=>{


        const container =
        document.getElementById(
            item.id
        );



        if(!container) return;




        const beritaKategori =

        beritaData

        .filter(

            berita =>

            berita.kategori === item.nama

        )

        .slice(0,3);




        container.innerHTML="";




        beritaKategori.forEach(berita=>{


            container.innerHTML += `



            <div

            class="category-item"

            onclick="bukaBerita('${berita.slug}')">


                ${berita.title}



            </div>



            `;



        });



    });



}









// =====================================
// VIDEO
// =====================================


function tampilkanVideo(){


    const container =

    document.getElementById(

        "video-news"

    );



    if(!container) return;





    container.innerHTML = `



    <div class="video-card">


        <img src="assets/images/video1.jpg">



        <div class="play-button">

            ▶

        </div>



        <h3>

            Video Kresekcorp

        </h3>



    </div>





    <div class="video-card">


        <img src="assets/images/video2.jpg">



        <div class="play-button">

            ▶

        </div>



        <h3>

            Behind The Scene

        </h3>



    </div>



    `;



}









// =====================================
// GALERI
// =====================================


function tampilkanGaleri(){


    const container =

    document.getElementById(

        "gallery-news"

    );



    if(!container) return;





    container.innerHTML = `



    <img src="assets/images/gallery1.jpg">


    <img src="assets/images/gallery2.jpg">


    <img src="assets/images/gallery3.jpg">


    <img src="assets/images/gallery4.jpg">



    `;



}









// =====================================
// DETAIL ARTIKEL
// =====================================


function tampilkanArtikel(){


    const container =

    document.getElementById(

        "article-detail"

    );



    if(!container) return;





    const params =

    new URLSearchParams(

        window.location.search

    );





    const slug =

    params.get("slug");






    const berita =

    beritaData.find(

        item =>

        item.slug === slug

    );







    if(!berita){


        container.innerHTML = `



        <h1>

        Berita tidak ditemukan

        </h1>



        `;


        return;



    }







    updateSEO(berita);








    let waktu = "";



    if(berita.time){


        waktu =

        " | " +

        berita.time +

        " WIB";


    }








    container.innerHTML = `



    <div class="breadcrumb">



        <a href="index.html">

            Home

        </a>




        <span>

            >

        </span>





        <a href="index.html#${berita.kategori.toLowerCase()}-news">


            ${berita.kategori}


        </a>





        <span>

            >

        </span>





        <span class="active">


            ${berita.title}


        </span>




    </div>









    <span class="badge">


        ${berita.kategori}


    </span>









    <h1>


        ${berita.title}


    </h1>









    <p class="article-excerpt">


        ${berita.excerpt}


    </p>









    <div class="article-meta">


        ${formatTanggal(berita.date)}

        ${waktu}


        |

        ${berita.author}



    </div>









    <div class="share-box">



        <h3>

            Bagikan Berita

        </h3>





        <div class="share-buttons">



            <a

            id="share-whatsapp"

            target="_blank">


                <img src="assets/images/social/whatsapp.png">


            </a>





            <a

            id="share-facebook"

            target="_blank">


                <img src="assets/images/social/facebook.png">


            </a>





            <a

            id="share-twitter"

            target="_blank">


                <img src="assets/images/social/x.png">


            </a>





            <a

            id="share-telegram"

            target="_blank">


                <img src="assets/images/social/telegram.png">


            </a>





            <button

            id="copy-link">


                <img src="assets/images/social/link.png">


            </button>





        </div>



    </div>









    <img

    src="${berita.thumbnail}"

    class="article-image"

    >







    <div class="article-content">


        ${berita.body}



    </div>





    `;




    aktifkanShare();



    tampilkanBeritaTerkait(berita);



}









// =====================================
// UPDATE SEO SHARE
// =====================================


function updateSEO(berita){



    document.title =

    "Kresekcorp | " +

    berita.title;





    const description =

    berita.excerpt;





    const image =

    berita.thumbnail;





    const url =

    window.location.href;





    const metaDescription =

    document.querySelector(

        'meta[name="description"]'

    );





    const ogTitle =

    document.querySelector(

        'meta[property="og:title"]'

    );





    const ogDescription =

    document.querySelector(

        'meta[property="og:description"]'

    );





    const ogImage =

    document.querySelector(

        'meta[property="og:image"]'

    );





    const ogUrl =

    document.querySelector(

        'meta[property="og:url"]'

    );





    if(metaDescription)

    metaDescription.content = description;





    if(ogTitle)

    ogTitle.content = berita.title;





    if(ogDescription)

    ogDescription.content = description;





    if(ogImage)

    ogImage.content = image;





    if(ogUrl)

    ogUrl.content = url;



}







// =====================================
// PINDAH HALAMAN
// =====================================


function bukaBerita(slug){


    window.location.href =

    "berita.html?slug="+slug;



}// =====================================
// BERITA TERKAIT
// =====================================


function tampilkanBeritaTerkait(beritaAktif){


    const container =

    document.getElementById(

        "related-news"

    );



    if(!container) return;





    const terkait =

    beritaData

    .filter(

        berita =>

        berita.kategori === beritaAktif.kategori &&

        berita.slug !== beritaAktif.slug

    )

    .slice(0,3);





    container.innerHTML="";





    terkait.forEach(berita=>{



        container.innerHTML += `



        <div

        class="related-item"

        onclick="bukaBerita('${berita.slug}')">





            <img src="${berita.thumbnail}">





            <div>


                ${berita.title}



            </div>





        </div>



        `;



    });



}









// =====================================
// SIDEBAR POPULER ARTIKEL
// =====================================


function tampilkanSidebarPopuler(){


    const container =

    document.getElementById(

        "sidebar-popular"

    );



    if(!container) return;





    container.innerHTML="";





    beritaData

    .slice(0,5)

    .forEach((berita,index)=>{



        container.innerHTML += `



        <div class="sidebar-item">



            ${index + 1}.

            ${berita.title}



        </div>



        `;



    });



}









// =====================================
// SOCIAL SHARE
// =====================================


function aktifkanShare(){



    const url =

    encodeURIComponent(

        window.location.href

    );





    const judul =

    encodeURIComponent(

        document.title

    );





    const whatsapp =

    document.getElementById(

        "share-whatsapp"

    );





    const facebook =

    document.getElementById(

        "share-facebook"

    );





    const twitter =

    document.getElementById(

        "share-twitter"

    );





    const telegram =

    document.getElementById(

        "share-telegram"

    );





    const copyButton =

    document.getElementById(

        "copy-link"

    );







    if(whatsapp){


        whatsapp.href =

        "https://wa.me/?text="

        +

        judul

        +

        "%20"

        +

        url;


    }







    if(facebook){


        facebook.href =

        "https://www.facebook.com/sharer/sharer.php?u="

        +

        url;


    }







    if(twitter){


        twitter.href =

        "https://twitter.com/intent/tweet?text="

        +

        judul

        +

        "&url="

        +

        url;


    }







    if(telegram){


        telegram.href =

        "https://t.me/share/url?url="

        +

        url

        +

        "&text="

        +

        judul;


    }







    if(copyButton){



        copyButton.onclick=function(){



            navigator.clipboard.writeText(

                window.location.href

            );




            alert(

                "Link berita berhasil disalin"

            );



        };



    }



}









// =====================================
// DIGITAL CLOCK WIB
// =====================================


function updateClockWIB(){



    const clock =

    document.getElementById(

        "clock-wib"

    );



    if(!clock) return;






    const waktu =

    new Date();






    const jam =

    waktu.toLocaleTimeString(

        "id-ID",

        {

            timeZone:"Asia/Jakarta",

            hour:"2-digit",

            minute:"2-digit",

            second:"2-digit",

            hour12:false


        }

    );





    clock.innerHTML =

    jam + " WIB";



}





setInterval(

    updateClockWIB,

    1000

);



updateClockWIB();









// =====================================
// ACTIVE MENU
// =====================================


function activeMenu(){



    const menu =

    document.querySelectorAll(

        ".main-menu a"

    );





    const current =

    window.location.hash;






    menu.forEach(link=>{



        link.classList.remove(

            "active"

        );





        if(

            link.getAttribute(

                "href"

            )

            === current

        ){



            link.classList.add(

                "active"

            );



        }



    });



}





window.addEventListener(

    "hashchange",

    activeMenu

);



activeMenu();









// =====================================
// START SYSTEM
// =====================================


loadBerita();
