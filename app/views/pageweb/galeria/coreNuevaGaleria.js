var app = angular.module('MainAppNuevaGaleria', ["ui.bootstrap"]);

function mainControllerNuevaGaleria($scope, $http, $timeout) {
    $scope.newGaleria = {};
    $scope.newFoto = {};
    $scope.items = {};
    $scope.fotos = {};
    $scope.selected = false;
    $scope.tab = 1;

    //#region CARGANDO ARREGLOS  PARA COMBOS (ENTIDADES FORANEAS)
    $scope.estadoGaleria = {};
    $scope.categoriaGaleria = {};
    $scope.newGaleria.activo = "0";
    ///$scope.municipios = {};

    $scope.personaRegistro = {};
    $scope.personaCambio = {};
    //#endregion

    $scope.newGaleria.fechaRegistro = new Date().toDateInputValue();

    //#region CARGA DE SELECT
    /*$http.get('./app/plugins/colombia-json-master/colombia.json')
        .then(function (res) {
            $scope.departamentos = res.data;
        });

    $scope.selectChanged = function (departamento) {
        $scope.ciudades = departamento.ciudades;
        //console.log(departamento.ciudades);
    };*/

    var year = new Date().getFullYear();
    var range = [];
    range.push(year);
    for (var i = 1; i < 50; i++) {
        range.push(year + i);
    }
    $scope.years = range;
    //
    var dias = 31;
    var arrDias = [];
    //arrDias.push(dias);
    for (var j = 1; j <= 31; j++) {
        arrDias.push(j);
    }
    $scope.dias = arrDias;
    //#endregion

    //#region  WIZARD
    $('.nav-tabs > li a[title]').tooltip();

    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);

        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $(".next-step").click(function (e) {
        console.log("...>>");

        /*if ($('#primerNombre').val() === '') {
            $(".error-message").html("<div class='container orange' style='padding:8px; font-size:1.6rem;'><i class='glyphicon glyphicon-info-sign' ></i> Digite su nombre por favor!</div>");
            return;
        }
        if ($('#primerApellido').val() === '') {
            $(".error-message").html("<div class='container orange' style='padding:8px; font-size:1.6rem;'><i class='glyphicon glyphicon-info-sign' ></i> Digite su apellido por favor!</div>");
            return;
        }
        if ($('#documento').val() === '') {
            $(".error-message").html("<div class='container orange' style='padding:8px; font-size:1.6rem;'><i class='glyphicon glyphicon-info-sign' ></i> Digite su documento por favor!</div>");
            return;
        }
        if ($('#sexo').val() === '') {
            $(".error-message").html("<div class='container orange' style='padding:8px; font-size:1.6rem;'><i class='glyphicon glyphicon-info-sign' ></i> Seleccione la opcion de sexo por favor!</div>");
            return;
        }*/

        $(".error-message").html("");
        var $active = $('.wizard .nav-tabs li.active');
        $active.next().removeClass('disabled');
        nextTab($active);

    });

    $(".prev-step").click(function (e) {
        console.log("<<...");
        var $active = $('.wizard .nav-tabs li.active');
        prevTab($active);

    });

    function nextTab(elem) {
        $(elem).next().find('a[data-toggle="tab"]').click();
    }
    function prevTab(elem) {
        $(elem).prev().find('a[data-toggle="tab"]').click();
    }
    //Add Inactive Class To All Accordion Headers
    $('.accordion-header').toggleClass('inactive-header');

    //Set The Accordion Content Width
    var contentwidth = $('.accordion-header').width();
    $('.accordion-content').css({});

    //Open The First Accordion Section When Page Loads
    $('.accordion-header').first().toggleClass('active-header').toggleClass('inactive-header');
    $('.accordion-content').first().slideDown().toggleClass('open-content');

    // The Accordion Effect
    $('.accordion-header').click(function () {
        if ($(this).is('.inactive-header')) {
            $('.active-header').toggleClass('active-header').toggleClass('inactive-header').next().slideToggle().toggleClass('open-content');
            $(this).toggleClass('active-header').toggleClass('inactive-header');
            $(this).next().slideToggle().toggleClass('open-content');
        }

        else {
            $(this).toggleClass('active-header').toggleClass('inactive-header');
            $(this).next().slideToggle().toggleClass('open-content');
        }
    });
    //#endregion

    //#region  RESOURCES
    //#endregion

    //#region CARGANDO COMPONENTES
    $http.get('/api/categoriaGaleria').success(function (data) {
        console.log(data);
        $scope.categoriaGaleria = data;
    }).error(function (data) {
        console.log('Error: ' + data);
    });

    //#endregion

    //#region CARGANDO COMPONENTES GENERALES PARA OPERAR LA ENTIDAD
    /*$http.get('/api/galeria').success(function (data) {    // Obtenemos todos los datos de la base de datos para cargar la lista inicial
        $scope.items = data;
    }).error(function (data) {
        console.log('Error: ' + data);
    });*/
    $scope.seleccionGaleria = {};

    //#region CARGANDO PARAMETROS CUANDO VIENE DE LA LISTA
    $scope.galeria = $scope.item;
    if ($scope.galeria === undefined) {
        console.log('... >> $scope.galeria === undefined');
    } else {
        /*console.log("$scope.galeria");
        console.log($scope.galeria);*/
        $scope.newGaleria = $scope.galeria;
        $scope.selected = true;
        $timeout(function () {
            $scope.newGaleria.fechaRegistro = $scope.galeria.fechaRegistro.substr(0, 10);
            $scope.newGaleria.activo = $scope.newGaleria.activo == false ? "0" : "1";

            $http.get('/api/fotos/' + $scope.newGaleria._id).success(function (dataO) {
                $scope.fotos = dataO;
            }).error(function (err) {
                console.log('Error: ' + err);
            });
        }, 200);

    }
    //#endregion

    // Función para buscar una galeria una galeria
    $scope.buscarGaleriaPorDocumento = function () {
        console.log("req.params.titulo:$" + $scope.newGaleria.titulo);

        if ($scope.newGaleria.titulo.length > 5)
            $http.get('/api/galeria/' + $scope.newGaleria.titulo, $scope.newGaleria)
                .success(function (data) {
                    if (data.length > 0) {
                        //console.log("recibiendo del router");

                        //console.log("data[0]");
                        //console.log(data[0]);

                        //console.log("$scope.newGaleria antes");
                        //console.log($scope.newGaleria);
                        $scope.newGaleria = data[0];

                        $scope.categoriaGaleria[0] = $scope.newGaleria.categoriaGaleria;
                        $scope.estadoGaleria[0] = $scope.newGaleria.estadoGaleria;
                    }
                    //$scope.newGaleria = {}; 
                    //$scope.newGaleria = data; // Borramos los datos del formulario
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    };

    $scope.arrayBufferToBase64 = function (buffer) {
        /*try {
            console.log("buffer.data");
            console.log(buffer);
        } catch (e) {
            return $scope.sinImagen;
        }*/
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };

    // Función para registrar a un item de licor
    $scope.registrarGaleria = function () {
        console.log("$scope.newGaleria");
        //$scope.newGaleria.imagenPrincipal = { data: document.getElementById("imgTest").innerHTML.substr(45,document.getElementById("imgTest").innerHTML.length-73)}; 
        //$scope.newGaleria.imagenPrincipal = document.getElementById("srcData").innerHTML;//.substr(45,document.getElementById("imgTest").innerHTML.length-73);
        //var base64Data = $scope.newGaleria.imagenPrincipal.replace(/^data:image\/png;base64,/,"");
        //var dataBuffer = new Buffer(base64Data, 'base64');

        //$scope.newGaleria.imagenPrincipal = dataBuffer.toString();
        //$scope.newGaleria.imagenPrincipal = document.getElementById("srcData").innerHTML;
        console.log($scope.newGaleria);
        console.log("//$scope.newGaleria");
        /*var config = {
            headers: {'Content-Type': undefined},
            transformRequest: []
        };*/

        //var headers = new Headers();
        /*const headers = new Headers({'enctype': 'multipart/form-data'});
        //headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');*/
        $http.post('/api/galeria', $scope.newGaleria)//, { headers: headers }, config
            .success(function (data) {
                var $active = $('.wizard .nav-tabs li');
                $active.addClass('disabled');
                console.log("enviando al router");
                console.log(data);
                console.log("// Borramos los datos del formulario");/**/
                $scope.newGaleria = {}; // Borramos los datos del formulario
                $scope.items = data;
                $scope.tab = 1;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    // Función para editar los datos de un item
    $scope.modificarGaleria = function (newGaleria) {
        $http.put('/api/galeria/' + $scope.newGaleria._id, $scope.newGaleria)
            .success(function (data) {
                $scope.newGaleria = {}; // Borramos los datos del formulario
                $scope.items = data;
                $scope.selected = false;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    // Función que borra un objeto item conocido su id
    $scope.borrarGaleria = function (newGaleria) {
        $http.delete('/api/galeria/' + $scope.newGaleria._id)
            .success(function (data) {
                $scope.newGaleria = {};
                $scope.items = data;
                $scope.selected = false;
                $scope.tab = 1;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    // Función que se activa al dar onchange en el select
    $scope.selectAction = function () {
        //console.log(objectSelect);
        console.log($scope.concentraciones);
    };

    // Función para coger el objeto seleccionado en la tabla
    $scope.selectGaleria = function (item) {
        /*$scope.concentraciones[0] = item.concentracion;
        $scope.formaFarmaceuticas[0] = item.formaFarmaceutica;
        $scope.tipoInventario[0] = item.tipoInventario;
        $scope.fabricante[0] = item.fabricante;
        $scope.categoria[0] = item.categoria;
        $scope.presentacion[0] = item.presentacion;*/
        $scope.newGaleria = item;
        $scope.selected = true;
        $scope.tab = 2;
        console.log($scope.newGaleria, $scope.selected);
    };

    $scope.imgsource;

    $('#fileSelected').on('change', function (evt) {
        var files = $(evt.currentTarget).get(0).files;
        var accept = {
            binary: ["image/png", "image/jpeg", "image/jpg"],
            text: ["text/plain", "text/css", "application/xml", "text/html"]
        };

        if (files.length > 0) {
            console.log(files);
            //console.log(files.name);
            console.log($('#fileSelectedImagenPrincipal').val().replace(/^C:\\fakepath\\/i, ''));
            swal("Formulario", "" + $('#fileSelectedImagenPrincipal').val().replace(/^C:\\fakepath\\/i, ''), "success");

            /*var data = files.getAsBinary();
            console.log(data);
            //if (files !== null) {
                if (accept.binary.indexOf(files.type) > -1) {
                  // files is a binary, which we accept
                  
                } else if (accept.text.indexOf(files.type) > -1) {
                  // files is of type text, which we accept
                  var data = files.getAsText();
                  console.log(data);
                  // modify data with string methods
                }*/
            //}
            /*var base64 = (files.toString('base64'));
            var url = sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + base64)
            $scope.imgsource = base64;*/
            //$('#filePath').text($('#fileSelected').val());


            var reader = new FileReader();
            //reader.onloadend = function() {
            /*console.log('Encoded Base 64 File String:', reader.result);*/

            /******************* for Binary ***********************/
            /*var data=(reader.result).split(',')[1];
             var binaryBlob = atob(data);
             console.log('Encoded Binary File String:', binaryBlob);*/
            reader.onloadend = function () {
                console.log('RESULT', reader.result)
            }
            //}
            reader.readAsDataURL(files);
        }
    });
    //#endregion


    //#region FILTROS
    $scope.sortType = 'nombreGenerico'; // set the default sort type
    $scope.sortReverse = false;  // set the default sort order
    $scope.searchFish = '';
    //#endregion

    //#region PAGINACIÓN

    $scope.currentPage = 0;//Pagina actual
    $scope.pageSize = 10; // cantidad de registros que deseamos mostrar por página
    $scope.pages = []; //paginas

    $scope.configPages = function () {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
            ini = 1;
            if (Math.ceil($scope.items.length / $scope.pageSize) > 10)
                fin = 10;
            else
                fin = Math.ceil($scope.items.length / $scope.pageSize);

            console.log("....." + $scope.currentPage);
        } else {
            if (ini >= Math.ceil($scope.items.length / $scope.pageSize) - 10) {
                ini = Math.ceil($scope.items.length / $scope.pageSize) - 10;
                fin = Math.ceil($scope.items.length / $scope.pageSize);
            }
            console.log("..." + $scope.currentPage);
        }
        if (ini < 1) ini = 1;
        for (var i = ini; i <= fin; i++) {

            console.log("..i:" + i);
            $scope.pages.push({ no: i });
        }
        if ($scope.currentPage >= $scope.pages.length) {
            $scope.currentPage = $scope.pages.length - 1;

            console.log("...." + $scope.currentPage);
        }

    };

    $scope.setPage = function (page) {
        console.log(page);
        $scope.currentPage = page - 1;
        var pagedData = $scope.items.slice(
            (page - 1) * $scope.pageSize,
            page * $scope.pageSize
        );
        $scope.items = pagedData;
        $scope.configPages();
    };

    $scope.$watch("currentPage", function () {
        $scope.configPages();
        //$scope.setPage($scope.currentPage);
    });
    //$scope.configPages();
    //#endregion

    //#region CARGANDO COMPONENTES PARA COMPONENTES VISUALES
    $scope.ajustarTabla = function (componenteTable, heightMax) {
        var totalHeight = 0;
        $("#" + componenteTable + " tr").each(function (i) {
            elemento = $(this);
            totalHeight += elemento.height();
        });
        if (totalHeight < heightMax) {
            $("#" + componenteTable + " thead tr").css("width", "-webkit-calc(100%)");
            $("#" + componenteTable + " thead tr").css("width", "-moz-calc(100%)");
            $("#" + componenteTable + " thead tr").css("width", "calc(100%)");
            $("#" + componenteTable + " tbody tr").css("width", "-webkit-calc(100%)");
            $("#" + componenteTable + " tbody tr").css("width", "-moz-calc(100%)");
            $("#" + componenteTable + " tbody tr").css("width", "calc(100%)");
        } else {
            $("#" + componenteTable + " thead tr").css("width", "-webkit-calc(100%-16px)");
            $("#" + componenteTable + " thead tr").css("width", "-moz-calc(100%-16px)");
            $("#" + componenteTable + " thead tr").css("width", "calc(100%-16px)");
            $("#" + componenteTable + " tbody tr").css("width", "-webkit-calc(100%)");
            $("#" + componenteTable + " tbody tr").css("width", "-moz-calc(100%)");
            $("#" + componenteTable + " tbody tr").css("width", "calc(100%)");
        }
    };
    //#endregion

    //#region COMPONENTE CALIFICACIÓN DE LA NOTICIA
    (function (e) { var t, o = { className: "autosizejs", append: "", callback: !1, resizeDelay: 10 }, i = '<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>', n = ["fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "wordSpacing", "textIndent"], s = e(i).data("autosize", !0)[0]; s.style.lineHeight = "99px", "99px" === e(s).css("lineHeight") && n.push("lineHeight"), s.style.lineHeight = "", e.fn.autosize = function (i) { return this.length ? (i = e.extend({}, o, i || {}), s.parentNode !== document.body && e(document.body).append(s), this.each(function () { function o() { var t, o; "getComputedStyle" in window ? (t = window.getComputedStyle(u, null), o = u.getBoundingClientRect().width, e.each(["paddingLeft", "paddingRight", "borderLeftWidth", "borderRightWidth"], function (e, i) { o -= parseInt(t[i], 10) }), s.style.width = o + "px") : s.style.width = Math.max(p.width(), 0) + "px" } function a() { var a = {}; if (t = u, s.className = i.className, d = parseInt(p.css("maxHeight"), 10), e.each(n, function (e, t) { a[t] = p.css(t) }), e(s).css(a), o(), window.chrome) { var r = u.style.width; u.style.width = "0px", u.offsetWidth, u.style.width = r } } function r() { var e, n; t !== u ? a() : o(), s.value = u.value + i.append, s.style.overflowY = u.style.overflowY, n = parseInt(u.style.height, 10), s.scrollTop = 0, s.scrollTop = 9e4, e = s.scrollTop, d && e > d ? (u.style.overflowY = "scroll", e = d) : (u.style.overflowY = "hidden", c > e && (e = c)), e += w, n !== e && (u.style.height = e + "px", f && i.callback.call(u, u)) } function l() { clearTimeout(h), h = setTimeout(function () { var e = p.width(); e !== g && (g = e, r()) }, parseInt(i.resizeDelay, 10)) } var d, c, h, u = this, p = e(u), w = 0, f = e.isFunction(i.callback), z = { height: u.style.height, overflow: u.style.overflow, overflowY: u.style.overflowY, wordWrap: u.style.wordWrap, resize: u.style.resize }, g = p.width(); p.data("autosize") || (p.data("autosize", !0), ("border-box" === p.css("box-sizing") || "border-box" === p.css("-moz-box-sizing") || "border-box" === p.css("-webkit-box-sizing")) && (w = p.outerHeight() - p.height()), c = Math.max(parseInt(p.css("minHeight"), 10) - w || 0, p.height()), p.css({ overflow: "hidden", overflowY: "hidden", wordWrap: "break-word", resize: "none" === p.css("resize") || "vertical" === p.css("resize") ? "none" : "horizontal" }), "onpropertychange" in u ? "oninput" in u ? p.on("input.autosize keyup.autosize", r) : p.on("propertychange.autosize", function () { "value" === event.propertyName && r() }) : p.on("input.autosize", r), i.resizeDelay !== !1 && e(window).on("resize.autosize", l), p.on("autosize.resize", r), p.on("autosize.resizeIncludeStyle", function () { t = null, r() }), p.on("autosize.destroy", function () { t = null, clearTimeout(h), e(window).off("resize", l), p.off("autosize").off(".autosize").css(z).removeData("autosize") }), r()) })) : this } })(window.jQuery || window.$);

    var __slice = [].slice; (function (e, t) { var n; n = function () { function t(t, n) { var r, i, s, o = this; this.options = e.extend({}, this.defaults, n); this.$el = t; s = this.defaults; for (r in s) { i = s[r]; if (this.$el.data(r) != null) { this.options[r] = this.$el.data(r) } } this.createStars(); this.syncRating(); this.$el.on("mouseover.starrr", "span", function (e) { return o.syncRating(o.$el.find("span").index(e.currentTarget) + 1) }); this.$el.on("mouseout.starrr", function () { return o.syncRating() }); this.$el.on("click.starrr", "span", function (e) { return o.setRating(o.$el.find("span").index(e.currentTarget) + 1) }); this.$el.on("starrr:change", this.options.change) } t.prototype.defaults = { rating: void 0, numStars: 5, change: function (e, t) { } }; t.prototype.createStars = function () { var e, t, n; n = []; for (e = 1, t = this.options.numStars; 1 <= t ? e <= t : e >= t; 1 <= t ? e++ : e--) { n.push(this.$el.append("<span class='glyphicon .glyphicon-star-empty'></span>")) } return n }; t.prototype.setRating = function (e) { if (this.options.rating === e) { e = void 0 } this.options.rating = e; this.syncRating(); return this.$el.trigger("starrr:change", e) }; t.prototype.syncRating = function (e) { var t, n, r, i; e || (e = this.options.rating); if (e) { for (t = n = 0, i = e - 1; 0 <= i ? n <= i : n >= i; t = 0 <= i ? ++n : --n) { this.$el.find("span").eq(t).removeClass("glyphicon-star-empty").addClass("glyphicon-star") } } if (e && e < 5) { for (t = r = e; e <= 4 ? r <= 4 : r >= 4; t = e <= 4 ? ++r : --r) { this.$el.find("span").eq(t).removeClass("glyphicon-star").addClass("glyphicon-star-empty") } } if (!e) { return this.$el.find("span").removeClass("glyphicon-star").addClass("glyphicon-star-empty") } }; return t }(); return e.fn.extend({ starrr: function () { var t, r; r = arguments[0], t = 2 <= arguments.length ? __slice.call(arguments, 1) : []; return this.each(function () { var i; i = e(this).data("star-rating"); if (!i) { e(this).data("star-rating", i = new n(e(this), r)) } if (typeof r === "string") { return i[r].apply(i, t) } }) } }) })(window.jQuery, window); $(function () { return $(".starrr").starrr() })

    $(function () {

        $('#new-review').autosize({ append: "\n" });

        var reviewBox = $('#post-review-box');
        var newReview = $('#new-review');
        var openReviewBtn = $('#open-review-box');
        var closeReviewBtn = $('#close-review-box');
        var ratingsField = $('#ratings-hidden');

        openReviewBtn.click(function (e) {
            reviewBox.slideDown(400, function () {
                $('#new-review').trigger('autosize.resize');
                newReview.focus();
            });
            openReviewBtn.fadeOut(100);
            closeReviewBtn.show();
        });

        closeReviewBtn.click(function (e) {
            e.preventDefault();
            reviewBox.slideUp(300, function () {
                newReview.focus();
                openReviewBtn.fadeIn(200);
            });
            closeReviewBtn.hide();

        });

        $('.starrr').on('starrr:change', function (e, value) {
            ratingsField.val(value);
        });
    });

    //#endregion

    //#region GESTIÓN DE IMAGENES

    // Función para registrar una foto
    $scope.registrarFoto = function () {
        console.log("$scope.newFoto");
        console.log($scope.newFoto);
        $http.post('/api/foto', $scope.newFoto)
            .success(function (data) {
                console.log("enviando al router");
                console.log("Respuesta: ");
                console.log(data);
                $scope.newFoto = {}; // Borramos los datos del formulario
                console.log("// Borramos los datos del formulario");
                $scope.fotos = data;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $http.get('/files').success(function (data) {
        $scope.files = data;
    }).error(function (data) {
        console.log('Error: ' + data);
    });

    $http.get('/api/fotos/' + $scope.newGaleria._id).success(function (dataO) {
        $scope.fotos = dataO;
    }).error(function (err) {
        console.log('Error: ' + err);
    });
    // Función para registrar un usuario al sistema
    $scope.cargarMini = function (object) {
        $('.modal-body').empty();
        var title = object.model.nombre;
        $('.modal-title').html(title);
        $('#modal-body').html("<img style='max-width:500px;'' src='image/" + title + "' />");
        $('#myModal').modal({ show: true });
    }
    // Función para registrar un usuario al sistema
    $scope.eliminarImagen = function (id) {
        Swal({
            title: 'Esta seguro?',
            text: "Esta desición no se puede revertir!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'SI, eliminar!'
        }).then((result) => {
            if (result.value) {

                $http.delete('/files/' + id)
                    .success(function (data) {
                        Swal(
                            'Eliminacion Exitosa!',
                            'El archivo ha sido eliminado.',
                            'success'
                        );
                        $http.get('/files').success(function (dataO) {
                            $scope.files = dataO;
                        }).error(function (err) {
                            console.log('Error: ' + err);
                        });

                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
            }
        });
    }

    $("#formUploadG").on("submit", function (e) {
        e.preventDefault();
        console.log("entro al metodo");
        var formData = new FormData(document.getElementById("formUploadG"));
        formData.append("dato", "valor");
        $.ajax({
            url: "/upload",
            type: "POST",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            jsonpCallback: 'callback',
            success: function (data) {
                console.log('Success: ' + data);
                var ret = angular.fromJson(data);
                console.log('Success: ' + ret.nombre);
                document.getElementById("imgTestG").innerHTML = "";
                $scope.newGaleria.imagenPrincipal = ret.nombre;
                $scope.newFoto.galeria = $scope.newGaleria;
                $scope.newFoto.nombre = ret.nombre;
                $scope.registrarFoto();

                /*$http.get('/files').success(function (dataO) {
                    $scope.files = dataO;
                }).error(function (err) {
                    console.log('Error: ' + err);
                });*/
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
            },
        });
    });

    $("#formUploadGA").on("submit", function (e) {
        e.preventDefault();
        console.log("entro al metodo");
        var formData = new FormData(document.getElementById("formUploadGA"));
        formData.append("dato", "valor");
        $.ajax({
            url: "/uploadga",
            type: "POST",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            jsonpCallback: 'callback',
            success: function (data) {
                console.log('Success: ' + data);
                var ret = angular.fromJson(data);
                console.log('Success: ' + ret.nombre);
                document.getElementById("imgTestGA").innerHTML = "";
                $scope.newFoto.galeria = $scope.newGaleria;
                $scope.newFoto.nombre = ret.nombre;
                $scope.registrarFoto();
                //se envia desde la funcion registrarFoto
                /*$http.get('/api/fotos').success(function (dataO) {
                    $scope.fotos = dataO;
                }).error(function (err) {
                    console.log('Error: ' + err);
                });*/
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
            },
        });
    });
    //#endregion
}
function b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
}

function encodeGaleriaImageFileAsURL() {
    var filesSelected = document.getElementById("fileG").files;
    //console.log(filesSelected[0]);
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result; // <--- data: base64
            var newImage = document.createElement('img');
            newImage.id = "srcData";
            newImage.src = srcData;
            //newImage.ng-model = "newGaleria.imagenPrincipal";
            document.getElementById("imgTestG").innerHTML = newImage.outerHTML;
            $("#srcData").css("max-width", "350px");
            //alert("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);
            //$scope.newGaleria.imagenPrincial.data = document.getElementById("imgTest").innerHTML.substr(0,15) ;
            //console.log("::" + document.getElementById("imgTest").innerHTML);
            //console.log("Converted Base64 version is " + document.getElementById("imgTest").innerHTML.substr(45,document.getElementById("imgTest").innerHTML.length-73));
        }
        fileReader.readAsDataURL(fileToLoad);
    }
}

//Cuando viene del upload de las fotos de la galeria lado derecho
function encodeGaleriaGAImageFileAsURL() {
    var filesSelected = document.getElementById("fileGA").files;
    //console.log(filesSelected[0]);
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            var srcDataGA = fileLoadedEvent.target.result; // <--- data: base64
            var newImage = document.createElement('img');
            newImage.id = "srcDataGA";
            newImage.src = srcDataGA;
            //newImage.ng-model = "newGaleria.imagenPrincipal";
            document.getElementById("imgTestGA").innerHTML = newImage.outerHTML;
            $("#srcDataGA").css("max-width", "300px").css("float", "right");
            //alert("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);
            //$scope.newGaleria.imagenPrincial.data = document.getElementById("imgTest").innerHTML.substr(0,15) ;
            //console.log("::" + document.getElementById("imgTest").innerHTML);
            //console.log("Converted Base64 version is " + document.getElementById("imgTest").innerHTML.substr(45,document.getElementById("imgTest").innerHTML.length-73));
        }
        fileReader.readAsDataURL(fileToLoad);
    }
}

function SampleRightClickController($scope, $rootScope, $timeout) {
    $scope.gridOptions = { data: $scope.items };
    $scope.rightClick = function (event) {
        var scope = angular.element(event.toElement).scope();
        console.log('Click en la fila: ', scope.rowRenderIndex);
    };
}
//#region METODO REGION FECHA
Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});
//#endregion

app.directive('rightClick', function ($parse) {
    return function (scope, element, attrs) {
        var fn = $parse(attrs.rightClick);
        element.bind('contextmenu', function (event) {
            scope.$apply(function () {
                event.preventDefault();
                fn(scope, { $event: event });
            });
        });
    };
});

//app.directive('contextMenu', [function () {
//    return {
//        restrict: 'A',
//        require: 'mdMenu',
//        link: function (scope, element, attrs, menu) {

//            var prev = { x: 0, y: 0 };
//            scope.$mdOpenContextMenu = function (event) {

//                menu.offsets = function () {
//                    var mouse = {
//                        x: event.clientX,
//                        y: event.clientY
//                    };
//                    var offsets = {
//                        left: mouse.x - prev.x,
//                        top: mouse.y - prev.y
//                    };
//                    prev = mouse;

//                    return offsets;
//                };

//                menu.open(event);
//            };
//        }
//    };
//}]);
//app.filter('startFromGrid', function () {
//    return function (input, start) {
//        start = +start;
//        return input.slice(start);
//    };
//});