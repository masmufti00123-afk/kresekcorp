const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");



const folderBerita = "./content/berita";

const outputFolder = "./data";

const outputFile = "./data/berita.json";





// buat folder data jika belum ada

if (!fs.existsSync(outputFolder)) {

    fs.mkdirSync(outputFolder);

}





let daftarBerita = [];





// cek folder berita

if (fs.existsSync(folderBerita)) {



    const files = fs
    .readdirSync(folderBerita)
    .filter(
        file => file.endsWith(".md")
    );




    files.forEach(file => {



        const isiFile = fs.readFileSync(
            path.join(folderBerita,file),
            "utf8"
        );



        const data = matter(isiFile);



        daftarBerita.push({


            slug:
            file.replace(".md",""),



            title:
            data.data.title || "",



            kategori:
            data.data.kategori || "",



            author:
            data.data.author || "",



            date:
            data.data.date || "",



            thumbnail:
            data.data.thumbnail || "",



            excerpt:
            data.data.excerpt || "",



            body:
            data.content



        });



    });


}






// urutkan berdasarkan tanggal terbaru

daftarBerita.sort(
    (a,b)=>
    new Date(b.date) -
    new Date(a.date)
);






fs.writeFileSync(

    outputFile,

    JSON.stringify(
        daftarBerita,
        null,
        2
    )

);





console.log(
    "Data berita berhasil dibuat"
);