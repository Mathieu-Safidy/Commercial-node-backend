const moongoose = require("mongoose");
// idProduit: {
//         bsonType: 'objectId'
//       },
//       quantitEntre: {
//         bsonType: 'int'
//       },
//       quantiteSortie: {
//         bsonType: 'int'
//       },
//       quantiteDisponible: {
//         bsonType: 'int'
//       },
//       modifiedAt: {
//         bsonType: [
//           'date',
//           'null'
//         ]
//       },
//       createdAt: {
//         bsonType: 'date'
//       }
const stockSchema = new moongoose.Schema({
    idProduit: { type: moongoose.Schema.Types.ObjectId, required: true , ref: 'produit'},
    quantitEntre: { type: Number, required: true },
    quantiteSortie: { type: Number, required: true },
    quantiteDisponible: { type: Number, required: true },
    modifiedAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now }
});
module.exports = moongoose.model("stock", stockSchema, "stock");
