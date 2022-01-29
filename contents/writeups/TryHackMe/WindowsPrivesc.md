---
date: '2022-01-22'
title: Windows Privesc
root: '/contents'
parents: ["TryHackMe"]
---

## Windows Privilege Escalation Room
# Task 2 Info Gathering
```
List users on the target system. One of them resembles a flag.
Net Users
List users on the target system. One of them resembles a flag.
`systeminfo | findstr /B /C:"OS Name" /C:"OS Version"`
When was security update KB4562562 installed?
`wmic qfe get Caption,Description,HotFixID,InstalledOn`
What is the state of Windows Defender?
sc query windefend
```
# Task 4 Vulnerable software
```
What version of a Fitbit application can you see installed?
wmic service list brief
What kind of vulnerability seems to affect the Fitbit application?
Unquoted Service Path
What version of FoxitReader is installed on the target  system?
9.0.1.1049
```
# Task 5 DLL Hijacking
```

Login with Jack's account (the new password you have set). What is the content of the flagdll.txt file?
THM-8377492093

```
# Task 6 Unquoted Service Path
```
What is the full unquoted path of unquotedsvc?
C:\Program Files\Unquoted Path Service\Common Files\unquotedpathservice.exe
Go through subfolders in the unquotedsvc binary path. Which folder does the user have read and write privileges on? (Please write the whole path)
C:\Program Files\Unquoted Path Service\
What would be the name of the executable you would place in that folder?
common.exe
Obtain Administrator privileges on the target machine. What is the content of the flagUSP.txt file?
THM-636729273483
```
