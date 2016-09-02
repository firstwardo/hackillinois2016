var socket = io();
     	var currentlyLongPressing = false;
     	var clicked = false;
     	var longPressStart = function(remote, code){
     		console.log(remote);
     		console.log(code);
     		console.log('long')
     		currentlyLongPressing = true;
            socket.emit('startButtonPress',{remote: remote, code: code});
        }
        var longPressEnd = function(remote, code){
     		console.log(remote);
     		console.log(code);
     		console.log('long stop')
            socket.emit('stopButtonPress',{remote: remote, code: code});
        }
        var singlePress = function(remote, code){
        	console.log(remote);
     		console.log(code);
     		console.log('single')
     		socket.emit('singleButtonPress',{remote: remote, code: code});
        }
     	
        var timeoutId = 0;
		$(':button').mousedown(function() {
			var name = $(this).data('remotename');
			var code = $(this).data('remotecode');
			clicked = true;
			timeoutId = setTimeout(longPressStart, 500, name, code);

		}).bind('mouseup mouseleave', function() {
			if(clicked && !currentlyLongPressing){
				var name = $(this).data('remotename');
				var code = $(this).data('remotecode');
				singlePress(name, code);
			}
			else if(currentlyLongPressing){
				var name = $(this).data('remotename');
				var code = $(this).data('remotecode');
				longPressEnd(name, code);
			}
			clicked = false;
			currentlyLongPressing = false;
			clearTimeout(timeoutId);
		});
     	});

    	
     	