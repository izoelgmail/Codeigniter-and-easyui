var ttl;
var urlx=sessionStorage.getItem('urlx');

function doSearchCustomer(){
	$('#dgCustomers').datagrid('load',{
		search_customer: $('#searchCustomer').val()
	});
}

function newCustomer() {
	$('#dlgCustomer').dialog('open').dialog('setTitle','Add Vendor Contacts');
	$('#fmCustomer').form('clear');
	url = urlx+'/Welcome/saveCustomer';
	ttl = "new";
}

function editCustomer() {
	var row = $('#dgCustomers').datagrid('getSelected');
	if (row){
		$('#dlgCustomer').dialog('open').dialog('setTitle','Edit');
		$('#fmCustomer').form('load',row);
		url = urlx+'/Welcome/updateCustomer/'+row.customerNumber;
		ttl = "updt";
	}else {
		$.messager.alert('Warning','Contact not selected!');
	}
}

function saveCustomer() {
	$('#fmCustomer').form('submit',{
		url: url,
		onSubmit: function(){
			return $(this).form('validate');
		},
		success: function(result){
			var result = eval('(' + result + ')');
			if (result.errorMsg){
				$.messager.show({
					title: 'Error',
					msg: result.errorMsg
				});
			}else if (result.success){
                $('#dlgCustomer').dialog('close');		// close the dialog
				$('#dgCustomers').datagrid('reload');	// reload the user data
                $('#fmCustomer').form('clear');
                var opts = $('#dgCustomers').datagrid('getColumnFields', true);
                var msg = ttl == "updt" ? "Update data success" : "New data added successfully";
                var title = ttl == "updt" ? "Data Update" : "New data";
                $.messager.alert({
                    title: title,
                    msg: msg,
                    fadeOut: 'slow',
                    showType:'fade',
                });
            }else {
				 $.messager.alert({
                        title: 'Error',
                        msg: "Encourage Error!"
                    });
			}
		}
	});
}

function destroyCustomer() {
	var row = $('#dgCustomers').datagrid('getSelected');
	if (row){
		$.messager.confirm('Confirm','Are you sure you want to delete this Vendor..? All data under this Vendor will be disappear',function(r){
			if (r){
				$.post(urlx+'/Welcome/destroyCustomer',{id:row.customerNumber},function(result){
					if (result.success){
						$('#dgCustomers').datagrid('reload');	// reload the Vendor data
					} else {
						$.messager.show({	// show error message
							title: 'Error',
							msg: result.errorMsg
						});
					}
				},'json');
			}
		});
	}
}