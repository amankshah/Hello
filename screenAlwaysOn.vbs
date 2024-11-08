set wsc= Createobject("WScript.shell")
Do
Wscript.Sleep(2*60*1000)
wsc.Sendkeys("{SCROLLOCK 2}")
Loop
