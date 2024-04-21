$.validator.setDefaults( {
			submitHandler: function () {
				alert( "submitted!" );
			}
		} );

		$( document ).ready( function () {

			$( "#jQueryValidationForm" ).validate( {
				rules: {
					yourname: "required",
          customerName: "required",
          contactPhone: "required",
          contactName: "required",
					phone: "required",
					username: {
						required: true,
						minlength: 2
					},
					password: {
						required: true,
						minlength: 5
					},
					confirm_password: {
						required: true,
						minlength: 5,
						equalTo: "#password"
					},
					email: {
						required: true,
						email: true
					},
          contactEmail: {
						required: true,
						email: true
					},

          country: "required",
          address: "required",
          userType: "required",
					agree: "required"
				},
				messages: {
					yourname: "Por favor, ingresa un nombre",
          customerName: "Por favor, ingresa un nombre de cliente",
          contactPhone: "Por favor, ingresa un número de contacto",
          contactName: "Por favor, ingresa un nombre de contacto",

					phone: "Por favor, ingresa un número de teléfono",
					username: {
						required: "Por favor, introduzca un nombre de usuario",
						minlength: "El nombre de usuario debe tener al menos 2 caracteres"
					},
					password: {
						required: "Por favor, introduzca una contraseña",
						minlength: "La contrasena debe tener al menos 5 caracteres"
					},
					confirm_password: {
						required: "Por favor, introduzca una contraseña",
						minlength: "La contrasena debe tener al menos 5 caracteres",
						equalTo: "Las constrasenas no coinciden"
					},
                    email: "Por favor, introduzca una dirección de correo electrónico valida",
                    contactEmail: "Por favor, introduzca una dirección de correo electrónico valida",
                    country: "Please select country",
                    userType: "Por favor, seleccione un tipo de usuario",
                    address: "Please type your message",
					agree: "Please accept our policy"
				},

			} );



		} );
