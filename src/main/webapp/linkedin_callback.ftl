<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>LinkedIn Callback</title>
</head>

<body>
<div >
    login success

</div>

<script type="text/javascript">
    (function callback(){
        window.opener.postMessage("Refresh main window", "${_r.rc.req.scheme}://${_r.rc.req.serverName}:${_r.rc.req.serverPort}");
        window.close();
    })();
</script>
</body>
</html>