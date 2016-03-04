// 顶部搜索固定栏


$(function () {

	$('#search_button').button({
		icons:{
				primary:"ui-icon-search",
			},
		});
		$('#question_button').button({
		icons : {
			primary : 'ui-icon-lightbulb',
		},
	}).click(function () {
		
			$('#question').dialog('open');
		
			
	});
			$(function(){
				
				if ($('.editor').height() > 155) {
					$('.editor').next('.bottom').find('.up').hide();
				
				$('.editor').height(155);
			}
			
			
			
			$('.bottom .down').click(function () {
					$('.editor').height(250);
					$(this).hide();
					$(this).parent().find('.up').show();
				});
			
						
			$('.bottom .up').click(function () {
					$('.editor').height(155);
					$(this).hide();
					$(this).parent().find('.down').show();
				});

	 });
	
	
	
	
	
	$('#question').dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		width : 500,
		height : 360,
		buttons : {
			'发布' : function () {
				$(this).submit();
			}
		}
	});
	
	
	
	
	
	
	
	$('.uEditorCustom').uEditor();
	// 注册弹出框
	
		$('#member, #logout').hide();
	
	if ($.cookie('user')) {
		$('#member, #logout').show();
		$('#reg_a, #login_a').hide();
		$('#member').html($.cookie('user'));
	} else {
		$('#member, #logout').hide();
		$('#reg_a, #login_a').show();
	}
	
	
		$('#reg_a').click(function () {
		$('#reg').dialog('open');
	});


	
	$('#reg').dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		width:320,
		height:340,
		resizable:false,
		title:'知乎新用户注册',
		buttons:{
			'提交' : function () {
				$(this).submit();
			}
		}
	}).buttonset().validate({
	
		submitHandler : function (form) {
			$(form).ajaxSubmit({
				url : 'add.php',
				
			});
		},
			showErrors:function(errorMap,errorList){
				var errors = this.numberOfInvalids();
				if (errors > 0) {
				$('#reg').dialog('option', 'height', errors * 20 + 340);
			} else {
				$('#reg').dialog('option', 'height', 340);
			}
					this.defaultShowErrors();
		},
		
	highlight : function (element, errorClass) {
			$(element).css('border', '1px solid #630');
		},
		
		unhighlight : function (element, errorClass) {
			$(element).css('border', '1px solid #ccc');
			$(element).parent().find('span').html('&nbsp;').addClass('succ');
		},
//highlight: function(element, errorClass, validClass) { }
//element出错时触发

//unhighlight: function(element, errorClass) { }
//触发element通过验证时触发	
		errorLabelContainer:"ol.reg_error",
		wrapper:'li',
		rules : {
			user : {
				required : true,
				minlength : 2,
			},
			pass : {
				required : true,
				minlength : 6,
			},
			email : {
				required : true,
				email : true
			},
			date : {
				date : true,
			},
		},
		messages : {
			user : {
				required : '帐号不得为空！',
				minlength : jQuery.format('帐号不得小于{0}位！'),
			},
			pass : {
				required : '密码不得为空！',
				minlength : jQuery.format('密码不得小于{0}位！'),
			},
			email : {
				required : '邮箱不得为空！',
				minlength : '请输入正确的邮箱地址！',
			},	
		}
	});
		
		
		
		
		// 日历
		
		$('#date').datepicker({
			showOn : 'button',
		buttonText : '日历',
		buttonImage : 'img/calendar.gif',
		buttonImageOnly : true,
		showOtherMonths : true,
		selectOtherMonths : true,
		changeMonth : true,
		changeYear : true,
		closeText : '关闭',
		currentText : '今天',
			});


		// 表单自动补全
			
	$('#email').autocomplete({
		delay : 0,
		autoFocus : true,
		source : function (request, response) {
			//获取用户输入的内容
			//alert(request.term);
			//绑定数据源的
			//response(['aa', 'aaaa', 'aaaaaa', 'bb']);
			
			var hosts = ['qq.com', '163.com', '263.com', 'sina.com.cn','gmail.com', 'hotmail.com'],
				term = request.term,		//获取用户输入的内容
				name = term,				//邮箱的用户名
				host = '',					//邮箱的域名
				ix = term.indexOf('@'),		//@的位置
				result = [];				//最终呈现的邮箱列表
						result.push(term);
						
						//当检测到输入的内容有@时，分别重新分配用户名和域名
						if(ix>-1){
								name = term.slice(0,ix);
								host = term.slice(ix+1);
							}
							if (name) {
				//如果用户已经输入@和后面的域名，
				//那么就找到相关的域名提示，比如bnbbs@1，就提示bnbbs@163.com
				//如果用户还没有输入@或后面的域名，
				//那么就把所有的域名都提示出来
				
				var findedHosts = (host ? $.grep(hosts, function (value, index) {
						return value.indexOf(host) > -1
					}) : hosts),
					findedResult = $.map(findedHosts, function (value, index) {
					return name + '@' + value;
				});
				
				result = result.concat(findedResult);
			}
			
			response(result);
		},	
	});
	


	// 登录弹出框
	
	
	$('#login_a').click(function () {
		$('#login').dialog('open');
	});
	
	
	$('#login').dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		width : 320,
		height : 250,
		buttons : {
			'登录' : function () {
				$(this).submit();
			}
		}
	}).validate({
	
		submitHandler : function (form) {
			$(form).ajaxSubmit({
				url : 'login.php',
				type : 'POST',
				
				
			});
		},
	
		showErrors : function (errorMap, errorList) {
			var errors = this.numberOfInvalids();
			
			if (errors > 0) {
				$('#login').dialog('option', 'height', errors * 21 + 250);
			} else {
				$('#login').dialog('option', 'height', 250);
			}
			
			this.defaultShowErrors();
		},
		
		highlight : function (element, errorClass) {
			$(element).css('border', '1px solid #630');
			$(element).parent().find('span').html('*').removeClass('succ');
		},
		
		unhighlight : function (element, errorClass) {
			$(element).css('border', '1px solid #ccc');
			$(element).parent().find('span').html('&nbsp;').addClass('succ');
		},
	
		errorLabelContainer : 'ol.login_error',
		wrapper : 'li',
	
		rules : {
			login_user : {
				required : true,
				minlength : 2,
			},
			login_pass : {
				required : true,
				minlength : 6,
				remote : {
					url : 'login.php',
					type : 'POST',
					data : {
						login_user : function () {
							return $('#login_user').val();
						},
					},
				},
			},
		},
		messages : {
			login_user : {
				required : '帐号不得为空！',
				minlength : jQuery.format('帐号不得小于{0}位！'),
			},
			login_pass : {
				required : '密码不得为空！',
				minlength : jQuery.format('密码不得小于{0}位！'),
				remote : '帐号或密码不正确！',
			}
		}
	});
	



$('#tabs').tabs();


	$('#tabs').tabs();
	
	$('#accordion').accordion({

		header : 'h3',
		icons : {
			"header": "ui-icon-plus",
			"activeHeader": "ui-icon-minus",
		},
	
	});
	

	
	
});


























