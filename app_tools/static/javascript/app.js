$(document).ready(function() {

            function UI(data) {

                data['tool'].forEach(element => { $('.container-conteudo').append(`<div class="conteudo rounded mb-4" data-id="${element['id']}">
<div class="conteudo-titulo d-flex justify-content-between align-items-center mb-1">
<h2><a href="${element['tool_link']}" class="text-primary" target="_blank">${element['tool_name']}</a></h2>
<a href="#" class="text-danger remover" data-backdrop="static" data-keyboard="false" data-toggle="modal" data-target="#modalDelete${element['id']}">❌ Remove</a>
</div>
<div class="corpo-conteudo">
<p>${element['tool_description']}</p>
</div>

<div class="tags">${ element['tags'] ? element['tags'].map(tag=>{
    return `<span>#${tag}</span>`}).join(''):''
}</div>

<div class="modal fade" id="modalDelete${element['id']}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">

<div class="modal-dialog modal-dialog-centered" role="document">

<div class="modal-content">

<div class="modal-header border-0">
<h5 class="modal-title" id="exampleModalCenterTitle">❌ Remove Tool</h5>
</div>

<div class="modal-body border-0 pl-5 pr-5">

<p>Are you sure want to remove <span class="markDelete">${element['tool_name']}</span></p>

</div>

<div class="modal-footer border-0">
<button type="button" class="btn btn-warning mr-5" data-dismiss="modal">Close</button>
<button type="button" class="btn btn-danger deleteEl" data-dismiss="modal">Yes, remove</button>
</div>

</div>

</div>

</div>

</div>`);
});



}



function comanndDelete() { 
    $('.deleteEl').on('click', function(param) {
        param.preventDefault();

        const id = $(this).closest('.conteudo').attr('data-id');

        deletar(id)

        $(this).closest('.conteudo').fadeOut(800, function() { $(this).remove(); });
    });
 }


    function carregarJson() {
        $.ajax({
            type: 'GET',
            url: `http://127.0.0.1:8000/json_tool`,
            dataType: 'json',
            beforeSend: function() {
                $('.container-conteudo').html(`
                <div class="spinner d-flex justify-content-center align-items-center">
                    <div class="spinner-border text-light" role="status" style="width: 5rem; height: 5rem;">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                `)
            },
            success: data => {
                    
                $('.container-conteudo').html('')
                if (data['tool']) {
                    UI(data);
                    comanndDelete();
        
                }
                    
            },
            error: erro => { console.log(erro) }
        })


    }

    carregarJson();

    $('#sendForm').on('click', function(param) {
        $('#toolName').val()
        if ($.trim($('#toolName').val()) && $.trim($('#toolLink').val()) && $.trim($('#toolDescription').val()) && $.trim($('#tags').val())) {

            let array = $('#tags').val().split(/[\s,]+/);


            
            $('#tags').val(array);

            let value = $('#formTool');


            $.ajax({
                type: value.attr('method'),
                url: value.attr('action'),
                data: value.serialize(),
                beforeSend: function() {
                    $('.container-conteudo').html(`
                    <div class="spinner d-flex justify-content-center align-items-center">
                        <div class="spinner-border text-light" role="status" style="width: 5rem; height: 5rem;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                    `)
                },
                success: function(data) {
                    messageAlert(data, 'alert-success');

                    $('.container-conteudo').html('')
                    $('#toolName').val('')
                    $('#toolLink').val('')
                    $('#tags').val('')
                    $('#formTool textarea').val('');
                    carregarJson();

                },
                error: function(erro) {
                    console.log(erro)
                }
            })

            return false
        } else {
            messageAlert('All fields must be filled!', 'alert-danger');
        }
    });

    function messageAlert(msg, alert) {

        if (!$('.aviso').length) {

            setTimeout(() => {
                $('.aviso').remove();
            }, 2000);
            $('.modal-body').append(`<div class="alert ${alert} aviso" role="alert">${msg}</div>`);
        } else {
            $('.aviso').remove();
            $('.modal-body').append(`<div class="alert ${alert} aviso" role="alert">${msg}</div>`);

        }

    };


    function deletar(id) {
        $.ajax({
            url: `/delete/${id}`,
            type: "GET",
            dataType: "json",
            success: function(data) {
                console.log(data)
            },
            error: function(erro) {
                console.log(erro)
            }
        });
    }

    $('#form_search').on('submit', function(param) {
        param.preventDefault();
        


        let value = $('#form_search')
        

        $.ajax({
            type: value.attr('method'),
            url: value.attr('action'),
            data: value.serialize(),
            beforeSend: function() {
                $('.container-conteudo').html(`
                <div class="spinner d-flex justify-content-center align-items-center">
                    <div class="spinner-border text-light" role="status" style="width: 5rem; height: 5rem;">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                `)
            },
            success: function(data) {
                if (data === 'None') {
                    $('.container-conteudo').html('')
                    return carregarJson();
                }

                
                $('.container-conteudo').html('')
                UI(data)
                comanndDelete();
               
                if($('#show').is(":checked")){
                   
                    $.each($('.tags span'), function (indexInArray, valueOfElement) { 
                       
                        if($(valueOfElement).html()===`#${$('#search').val()}`){
                            $(valueOfElement).addClass('mark');
                        }
                   });
                }
                 
            },
            error: function(erro) {
                console.log(erro)
            }
        })
    })

$('#home').on('click',()=>{
    $('.container-conteudo').html('');
    $('#search').val('');
    $('#show').prop('checked', false)
    carregarJson();
});

});