const express = require('express');
const app = express();
const path = require('path');
let conn;

app.get('/',function(req,res){
    res.send('Página de inicio');
});

//trabajadores

app.get("/trabajadores", function (req, res) {

    conn.query("SELECT * FROM trabajadores", function (err, results) {
        if (err) throw err;
        res.json(results);
    });

});

app.get("/trabajadores/:dni", function (req, res){
    let dni = req.params.dni;
    let sql = "SELECT *t, s.nombreSede FROM trabajadores t inner join sedes s on t.idsede=s.idsede WHERE dni=?";
    let params = [dni];

    conn.query(sql, params, function(err, results){
        if(err) throw err;
        res.json(results);
    });
});

app.get("/trabajadores/ventas/:dni", function (req, res){
    let dni = req.params.dni;
    let sql = "SELECT v.fecha, i.nombre, i.numeroserie, m.nombre FROM trabajadores t inner join ventas v on t.dni=v.dniTrabajador inner join inventario i on v.id_inventario=i.idiventario inner join marcas m on i.idmarca=m.idmarca WHERE t.dni=?";
    let params = [dni];

    conn.query(sql, params, function(err, results){
        if(err) throw err;
        res.json(results);
    });
});

//Sedes

app.get("/sedes", function (req, res) {

    conn.query("SELECT * FROM sedes", function (err, results) {
        if (err) throw err;
        res.json(results);
    });

});

app.get("/sedes/:idsede", function (req, res){
    let idsede = req.params.idsede;
    let sql = "SELECT * FROM sedes WHERE idsede=?";
    let params = [idsede];

    conn.query(sql, params, function(err, results){
        if(err) throw err;
        res.json(results);
    });
});

app.get("/sedes/trabajadores/:idsede", function (req, res){
    let idsede = req.params.idsede;
    let sql = "SELECT *t FROM trabajadores t INNER JOIN sedes s ON t.idsede = s.idsede WHERE s.idsede = ?";
    let params = [idsede];

    conn.query(sql, params, function(err, results){
        if(err) throw err;
        res.json(results);
    });
});

app.listen(3000,function(){
    console.log("Servidor corriendo en el puerto 3000");
});

