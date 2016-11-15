<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<title>Joker</title>
	<link rel="stylesheet" href="${_r.contextPath}/libs/bootstrap-4.0.0/css/bootstrap.min.css" />
	<link rel="stylesheet" href="${_r.contextPath}/libs/summernote/summernote.css" />

	<script type="text/javascript">
		var user;
		[#if _r.user??]
			user = {
				id: ${_r.user.id},
				userName: "${_r.user.username}",
				admin: ${_r.user.admin?string('true', 'false')}
			};
		[#else]
			user = null;
		[/#if]
	</script>
</head>

<body>
	<div id="app-admin"></div>
	<script type="text/javascript" src="${_r.contextPath}/libs/jquery/jquery.min.js"></script> 
	<script type="text/javascript" src="${_r.contextPath}/libs/tether/tether.min.js"></script>
	<script type="text/javascript" src="${_r.contextPath}/libs/bootstrap-4.0.0/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="${_r.contextPath}/libs/summernote/summernote.js"></script>
	<script async src="${_r.contextPath}/dist/admin.js"></script>
</body>
</html>