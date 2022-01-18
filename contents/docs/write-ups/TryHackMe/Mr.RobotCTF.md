---
date: 01172022
title: Mr.Robot CTF
---

# First Blog

> Mr Robot CTF
“I never want to be right about my hacks, but people always find a way to disappoint”

This room is themed around the popular series on Netflix called Mr.Robot. The story follows a person named Elliot Alderson, a cybersecurity engineer and hacker with social anxiety disorder and clinical depression. Elliot is recruited by an insurrectionary anarchist known as "Mr. Robot", played by Christian Slater, to join a group of hacktivists called "fsociety”. The group aims to destroy all debt records by encrypting the financial data of E Corp, the largest conglomerate in the world.

This room has two tasks with Task 1 giving you instructions on how to connect to the VPN. This isn't important if you are using the attackbox or kali box that TryHackMe already provides us with, so we will skip this task.I will be using the attackbox provided. My approach to these write-ups will be more narrative and I will try to guide you through my process on things that I have tried in regards to what gave results and what didn’t. Enjoy!

Task 2: Hack the machine



Enumeration
Oh, hey! Didn’t notice you there. Looks like you stumbled upon me trying to hack into E Corp. There are three keys hidden in their servers that I am trying to find. You must hate E Corp as much as I do if you’re here. Let’s work together to get what we need. Okay we need to somehow enumerate and get information about their servers… How do we do that…? Think Alvin.. Think… Do you happen to know? Oh! Got it! I can use nmap to scan for any open ports and use that to my advantage! What were the commands again… Hmm… Oh! That’s right… nmap -v -sCV targetIP. What this will do is make it verbose so it will show the scanning process so we won't see a blank terminal, attempt to find version information, and run a default NSE script built into nmap. 

Excellent! This output on the terminal gave me enough information to get started. Genius! Sometimes, I think I'm too smart for my own good, heheh. It looks like they have two ports opened, 22 and 80. That is SSH and HTTP. With SSH, we can remote in if needed but first let’s take a look at their apache webpage.


This is very nice… Looks like some of those commands play a video. Join prompts us to input an email in. Inform provides us a few slides with some stories… and question provides us more slides with a possible backstory… This is indeed interesting but it seems like we can’t really do much in the terminal we are given so lets take a look around with the website itself maybe see what directories there are with the source code.


Nothing too useful I suppose. Let’s use some tools now to see what we can find. Let’s try giving dirb a try. So, let’s go back to the terminal and get on dirb. Looks like dirb provided us with some interesting finds… 
 
I see a readme page and a robots.txt file lets take a look at those to see what we find… Nothing from the readme page but this…

How about the robots pages?

BINGO! We found our first key and a dictionary file that we can use as well! I’d say we were making great progress and doing pretty well so far. Don’t you think?

Now, let's see if we can download those two files we found and inspect it. Okay, it looks like key-1-of-3.txt doesn’t download but it gives us a key directly on the browser! Very nice!

I’ve downloaded the fsocity.dic file. Now let’s use the cat command on the terminal to see what is in the dictionary file.

Exploitation
Nice! What now? What can I do with this dictionary file? Friend, do you have any ideas? I think this dictionary file can be used for something else but what? Wasn’t there a tool that we can use a wordlist against a http webpage? Oh, Hydra… Good thinking. But wait… I think we are missing something… Oh, I remember seeing dirb finding a wordpress login directory. Let’s take a look at that.

There it is! A login page. Let’s try some default credentials like admin/admin.

No success. What should we do? Burpsuite maybe? We can use that to inject a cookie to get us in. Let’s do it!

Burpsuite is up now. Let’s also enable FoxyProxy on the browser so burpsuite can intercept it.

Enter the default credentials again so we can see the request and exploit it.

Nice! Don’t worry about the whole request, the important part is the login information on line 15. We see the login request. Let’s turn off foxyproxy now as we got what we need and it is no longer needed. Now, we will be using hydra with the command hydra -L fsocity.dic -p test 10.10.122.85 http-post-form "/wp-login.php:log=^USER^&pwd=^pwd^:Invalid username” -t 30. 
And we get a username.


We try out the username on the portal and we see that it is a valid username.

Things are starting to get good I would say… Heheh. This makes me smile. E Corp already lost 1 key and I can’t wait to get their other two keys. Now, we are going to change our hydra command a little to this: hydra -l Elliot -P fsocity.dic 10.10.122.85 http-post-form "/wp-login.php:log=^USER^&pwd=^pwd^:The password you entered for the username" -t 30. The only difference with this and the previous command is we have a valid username to run the wordlist on. It’s funny. A professional organization using wordpress. Everyone knows wordpress has a lot of vulnerabilities.

We got a list of valid passwords on Elliot’s account now! Okay, hydra is taking too long. Let’s move forward with using wpscan. The command for wpscan is wpscan --url targetIP -U Elliot -P fsocity.dic. At the end of the scan we are presented with the password of ER28–0652. Let’s try it.

We are in.Now, one of the weaknesses that wordpress has is we are able to open a shell from within their portal using the php editors. So, let’s look for a php reverse shell to download and use. I used PenTest Monkey Github for the php reverse shell. I unzipped the file with the command unzip php-reverse-shell-master.zip to extract the contents then I opened up the php file in a viewer and copied and pasted it in the appearance editor. Don’t forget to scroll up and change the IP address and port! The IP is going to be your host IP and the port that you want to use. Now open up another terminal and enter nc -lvnp port. This will open up netcat to listen on the port you want. I will be using port 4444.




Wow… This feels too easy or am I that good? 

Sorry… Was just talking to myself. Let’s get back to work. I’m going to open a new tab and enter in the target’s IP address and intentionally go into the 404 page to send the shell forward.

Sweet! It went through!


From here, we need to upgrade our shell. Hey friend, you’ve been quiet this entire time. Let’s find out who we were able to get in as. I’ll put in the command whoami. 

Looks like I am daemon. Let’s find out some host information. We will use the command hostname.

So, they named their machine linux. Wow. Now, we know what machine they are using. Next, we will find out what directories are available. We will use the ls command to find out directories.

We see a home directory and a root directory. Jackpot! Let’s change directories to home and see what is inside with cd home then ls again to see what else is inside.

There’s a robot directory. Let’s enter cd robot to get in that directory and ls again.

We found key 2 and a hash file! Let’s see if we can view that txt file first.

Denied. We need root. That hashfile might have something to do with getting root access. Let’s take a look!

It does. Looks like it is hashfile for the user robot. Which must be root. I think we can run that hash in a hash cracker. Let’s figure out what tools we can use to crack hashes… Hashcat takes too long you say? Okay, we can skip hashcat then since we don’t have much time. What’s that? Crackstation is fast? Okay, understood. We will go with that.

Got it cracked and we got the password!

Now, let’s get root access. Before we get root access we need to get a better shell or terminal. How do we get a better shell? Friend, do you have any ideas? What’s that? We need to use python? What’s the command for that? Python -c ‘import pty:pty.spawn(“/bin/sh”). What does this command do? It identifies when a terminal (tty) is spawned via Python. Attackers may upgrade a simple reverse shell to a fully interactive tty after obtaining initial access to a host.Oh okay. Understood.

I guess. Now, that we have a shell. We need to get root access now. One way we can do that is entering the command  su robot. This will tell the terminal we want to access robot as a super user. This is where we will enter his password.

We are in! Let’s try to get that second key now! We will change the directory into home again and cat that key file.

Got the key! We are getting closer on taking down E Corp now! This is an amazing feeling, friend. Couldn’t have done it without you. You’ve been a great help!
Pivot and Escalation
We are nearing the end and almost at the goal. Stay with me now! What’s next? We need to find the suids. Do you happen to know the command for that? Find / -perm +6000 2>/dev/null. Understood.

Look at that… Wait! Hold on… There’s nmap on here! This is too good to be true! I think I know what to do now. Let’s try nmap --interactive.

We got an interactive shell with nmap! My heart is beating so fast and I can’t stop grinning! Before we get carried away let’s finish the job! Gotta change directory back to root. We will use cd ../.. Then ls to show root directory.

We see it. Now we will change into that directory and list files again.

Now, let's view the file contents…


The End
I can’t believe it… It’s over… This is the end of the tunnel, friend. We got the last key and now we own E Corp. Thanks for coming along with me on this journey. We can finally rest easy knowing that E Corp doesn’t have power anymore. I would like to thank you and this is where we part ways…





