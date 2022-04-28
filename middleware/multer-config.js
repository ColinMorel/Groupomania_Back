const multer = require('multer');

const MIME_TYPES = {
    'image/jpg':'jpg',
    'image/jpeg':'jpg',
    'image/png':'png'
}

const storage = multer.diskStorage({
    destination:(req, file, callback)=>{ //retourne dans quel dossier enregistrer les fichiers (req, file et callback)
        callback(null,'images') //null pour dire pas eu d'erreur, puis nom du dossier
    },
    filename: (req,file,callback)=>{
        const name = file.originalname.split(' ').join('_');// nom de la partie avant l'extension, remplace les espaces par des _
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension); //on renvoit comme nom entier du fichier le nom + la date pour rendre unique . extension en fonction de l'extension entrante
    }
}); //objet de configuration pour multer, qui va enregistrer sur le disque

module.exports = multer({storage}).single('image') //single pour dire que c'est un fichier (d'image) unique et non de grp de fichier.