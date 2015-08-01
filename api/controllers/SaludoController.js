/**
 * SaludoController
 *
 * @description :: Server-side logic for managing saludoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports =
{
    ///////////////
    //// POST  ////
    ///////////////
    create: function(req, res)
    {
      var params = req.params.all()
      Saludo.create({saludo: params.saludo}).exec(function createCB(err,creado)
      {
        res.status(200)
        res.json(
        {
          notice: 'ID de saludo: ' + creado.id
        });

      });
    },
    //////////////
    //// GET  ////
    //////////////
    find: function (req, res, next)
    {
      var id = req.param('id')
      var bandera = esFuncion(id);

      if(bandera === true)
      {
        return next();
      }

      if(id)
      {
        Saludo.findOne(id, function(err, saludo)
        {
          if(saludo === undefined)
          {
            return res.notFound();

          }
          if(err)
          {
            return next(err)
          }

          res.json(saludo.saludo)
        });
      }

      Saludo.find(null, function(err, saludo)
      {
        if(saludo === undefined)
        {
          return res.notFound();

        }
        if(err)
        {
          return next(err)
        }

        var texto = ""
        for (i = 0; i < saludo.length; i++)
        {
          var objeto = saludo[i];
          texto = texto + objeto.saludo + " | "
        }

        res.json(texto)
      });

      function esFuncion(id)
      {
        if(id === 'find' || id === 'update' || id === 'destroy')
        {
          return true
        }
      }
    },
    /////////////
    //// PUT ////
    /////////////
    update: function(req, res, next)
    {
      var cambio = _.merge({}, req.params.all(), req.body)
      var id = req.param('id')
      if(!id)
      {
        return res.badRequest('Se debe de ingresar un id')
      }
      else
      {
        Saludo.update(id, cambio, function(err, saludo)
        {
          if(saludo.length === 0)
          {
            return res.notFound()
          }
          if(err)
          {
            return next(err)
          }
          res.json(saludo.saludo)
        });
      }
    },
    ////////////////
    //// DELETE ////
    ////////////////
    destroy: function (req, res, next)
    {
      var id = req.param('id')
      if(!id)
      {
          return res.badRequest('Se debe de ingresar un id')
      }
      else
      {
        Saludo.findOne(id, function(err, saludo)
        {
          if(!saludo)
          {
            return res.notFound()
          }
          if(err)
          {
            return res.serverError(err)
          }

          Saludo.destroy(id, function (err)
          {
            if(err)
            {
              return next (err)
            }
            res.status(200)
          });
        });
      }
    }
};
