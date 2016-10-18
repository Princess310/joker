[#-- If admin, we bypass the _frame.ftl and load directly the targeted template --]
[#if piStarts("/admin")]
[@includeFrameContent /]
[#-- if we have a user in the request, we display the application --]
[#else]
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Joker</title>
	<script async src="${_r.contextPath}/dist/app.js"></script>
</head>

<body>
	[@includeFrameContent /]
</body>
</html>
[/#if]