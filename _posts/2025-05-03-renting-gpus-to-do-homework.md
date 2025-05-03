---
layout: post
title: Renting GPUs to do homework
date: 2025-05-03
description: Quick tips on renting GPUs to train ML models.
tags: data-science, machine-learning
categories: study
giscus_comments: true
---


> Disclaimer: Renting GPUs, at least the way described in this blog post, is not totally secured, nor is it the only choice, nor are my practices best practices. Readers can feel free to suggest better methods, I am in need of them too. I also assume your know some Linux commands (like `cd`) and when to use them.
> 

# Why rent GPU

In my last semester at NTU, I had to do some work with deep learning, including both model training and inference. It needed the power of the GPU, but I only have measly Macbook Air. My options include: to build a PC with GPU (too expensive, although I want one down the line so I can play PC games too), to use the school’s provided GPU (too much of a hassle since I’m not familiar with the procedure, also I don’t think it is that powerful), to use Google Colab (slow, also not enough VRAM), or to rent a GPU for a few hours via some online service. The last option is the most convenient and quite price effective, as we shall see below.

# Where to rent and pricing

You can go on Google and search for “rent GPU” and it will return plenty of sites. I personally used [vast.ai](http://vast.ai) (not affiliated, just the first site that came up in my search). Go to their website and you will see plenty of options: you can choose from a wide range of GPU and storage options, with different pricing of course. I can go as low as RTX 3090 (~0.2\$/hr) or as high as A100 (~0.9\$/hr), which I think is not too expensive – my last group project costed about 10$ in total to train on an A100. Choosing a GPU is matter of need and experience, and unfortunately in this issue I have no advice – I am just as confused as the next guy. 

# Caveats

If you use your own machine, or Colab for that matter, than you’d be used to having everything set up from the get go (machine learning packages already installed, etc.). This is not the case when renting GPU. Everytime you rent a new GPU, you’d have to configure git, and set up the Python environment, etc. When you rent GPUs, you only rent them temporarily (for a few hours a day), so if you have to work over the course of a few days, chances are you’d have to repeat the setting up process several times. That’s also why I wrote this post, to share some tricks that will speedup the process.

Not to mention, you’d also have to re-download your data onto the new machine, which can be quite the hassle if it’s several GBs. For this I can offer no solutions, other than maybe choose a machine with fast internet speed (on vastai you can see the internet speed of the machine).

On top of all this, as far as I know renting a GPU is not totally secured, since you’d be putting your data on what is essentially a stranger’s machine. I’m not a security expert but who knows what can happen, so it’s best keep the use cases to just homework or personal projects.

# Getting started

To rent a GPU is quite simple, the UI is pretty much self-explanatory so you can just go on the website, choose which GPU you want, and press RENT.

# Interacting with the GPU

For a more comprehensive guide, do check out the documentation of your chosen service provider. I’ll only summarize a few of my practices here. (That said, I find vastai documentation to be quite confusing to a beginner).

As far as I understand there are two ways to use the GPU. 

Vastai provides a Jupyter Lab / Jupyter Notebook interface plus a terminal, so you can just use that. It looks exactly the same as using a Jupyter Notebook on your local machine. If you want to go with this option you won’t need the rest of this post.

The second option, which I prefer for several reasons, is that you can connect to the virtual machine using SSH (from now on let’s just call the machine with GPU the “virtual machine”, I don’t have a better terminology). This has the added benefit of being able to use your own terminal and code editor (I am quite picky when it comes to the choice of editor), which I shall explain below.

# SSH Keys

To connect via SSH, you’d need to first create a public/private key pair on your local machine. You’d provide the public key to the virtual machine, so that when your local machine connects, the virtual machine knows that it’s you. You may have done this when setting up your GitHub account. I *feel* like it’s better to have a separate key pair for the GPU renting purpose (although I can’t quite explain why). 

On your local terminal run: 

```bash
ssh-keygen -t rsa
```

And then type in the directory in which to save your keys and press enter. For me it looks something like `/Users/giangson/.ssh/id_rsa_gpu`. If you don’t provide a directory it will save in the default path which is `/Users/giangson/.ssh/id_rsa`, which I already used for my GitHub.

To get the content of the public key, run: (do change out my path with the path on your machine)

```bash
cat /Users/giangson/.ssh/id_rsa_gpu
```

This will output the public key which looks something like this: (not my actual private key btw, never share your private key)

```bash
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAZBAQDdxWwxwN5Lz7ubkMrxM57CHhVzOnZuLt5FHi7J8zFXCJHfr96w+ccBOBo2rtBBTTRDLnJjIsKLgBcC3+jGyZhpUNMFRVIJ7MeqdEHgHFvUUV/uBkb7RjbyyFcb4BCSYNggUZkMNNoNgEa3aqtBSzt47bnuGqKszs9bfACaPFtr9Wo0b8p4IYil/gfOY5kuSVwkqrBCWrg53/+T2rAk/02mWNHXyBktJAu1q9qTWcyO68JTDd0sa+4apSu+CsJMBJs3FcDDRAl3bcpiKwRbCkQ+N63ol4xDV3zQRebUc98CJPh04Gnc41W02lmdqFL2XG5U/rV8/JM7CawKiIz3dbkv bob@velocity
```

You need to copy this whole thing (beginning from ssh-rsa to the email at the end).

With this public key you can do two things. 

First, you can go vastai and add this key to the virtual machine so that it can authenticate you when connect (once you’ve rented a machine there’s a button to add SSH keys). 

Second, you can go to GitHub and add this to your list of SSH keys, i.e you’ll also use this public-private keypair to authenticate with GitHub. 

# SSH Connect

Once you’ve added the public key to the machine, you’ll see this command pop up: 


{% include figure.liquid path="assets/img/posts/renting_gpus/ssh_command.png"  class="img-fluid z-depth-1" style = "width:75%" %}

This commands means that you’re connect (`ssh`) to the machine at IP `5.17.27.63` as `root` user through port `46769`. If you were to run this exact command I don’t think it’ll work, because you don’t have the my private key (that’s why we set up the key pair in the previous step).

Anyway, once you have the command specific to your machine, run it in the terminal and you’ll be connected to the VM.

{% include figure.liquid path="assets/img/posts/renting_gpus/ssh_connected.png"  class="img-fluid z-depth-1" style = "width:75%" %}


# Setting up Git and the environment

In the previous step we have added a public key to your GitHub account, now to use it on the VM it’d need to have the corresponding private key. 

You can get the private key like this by running it in your local terminal

```bash
cat ~/.ssh/id_rsa_gpu
```

Same deal as before, copy all the content. 

Then add it on the VM: 

```bash
cat << 'EOF' > ~/.ssh/id_rsa
(add your private key here)
EOF

chmod 600 ~/.ssh/id_rsa
chmod 700 ~/.ssh

```

Alternatively, you can create another public-private key pair on the VM. I find this to be quite inconvenient, although it may be a bit more secured? The reason is that with each new key pair, you need to add the new public key to your GitHub which can take a few steps, whereas if you’re reusing the old key pair then you’d only need to add that once.

Anyway, now that you’re set up to use git commands. You can start cloning your repo onto the VM.

To push, you’d also need to run the following commands on the VM: (remember to change out the values with yours)

```bash
eval `ssh-agent -s`
ssh-add ~/.ssh/id_rsa

# Avoid GitHub authenticity prompt
echo "🌐 Adding GitHub to known_hosts..."
ssh-keyscan github.com >> ~/.ssh/known_hosts
chmod 644 ~/.ssh/known_hosts

# Optional: Configure Git identity (needed for pushing)
git config --global user.name "your name"
git config --global user.email "your_email@example.com"
```

# Your repo

One thing that I haven’t mentioned is that it is better to have your code written before renting the GPU and after renting you’d need to just execute it (to save time and money). Most likely you’ve written your machine learning code and pushed it to your repo. Even better if you have some code to automatically load data (which is already the case when you’re working with generic datasets, i.e: MNIST, CIFAR and such). 

It is even better if in your repo there’s a `requirements.txt` that contains all the necessary packages to run your program. I’ve seen some people not include this? I mean if you want to go manually write our your pip install command then sure but I think a requirements file is just much better practice (we’ll see below).

To create the `requirements.txt` file you can either run this command on your local environment

```bash
pip freeze > requirements.txt
```

Which will automatically lists all of your installed packages and their versions into a txt file. This is quite handy, but for my taste I’d often just list out the packages I know I need for one project (because I prefer a minimalistic approach). This is quite easy, I just look at my import statements.

So my requirements file often just looks like this:

```bash
torch
datasets
torchvision
numpy
pandas
matplotlib
scikit-learn
transformers
tqdm
tokenizers
rouge_score
ipython
ipykernel
```

The purpose a requirements file is that you can quickly install all the package with this command `pip install -r requirements.txt`.

All in all, after you’re set up the private-key pair, you can run the following commands to clone your codebase, set up a virtual environment and install the packages: (also be sure to change out the repo and folder name)

```bash
echo "📂 Cloning GitHub repository..."
GITHUB_REPO="git@github.com:giangson19/DeepLearningLLM.git"
git clone "$GITHUB_REPO"
REPO_DIR="DeepLearningLLM" # Folder name after cloning
cd "$REPO_DIR"

echo "🐍 Setting up Python virtual environment..."
VENV_NAME="deeplearning"                         # Virtual environment name
PYTHON_VERSION="python3.8.5"               # Change if needed
$PYTHON_VERSION -m venv "$VENV_NAME"
source "$VENV_NAME/bin/activate"

echo "📦 Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt
```

# VSCode Remote

If you’re a pro then from the previous step you’re already set up to run your program in the terminal like this:

```bash
python run_weight_pruning.py
```

But I sometimes need some final code edits or just a nice UI for file organization. VSCode, my editor of choice, has this handy extension called [Remote Development](https://marketplace.visualstudio.com/items/?itemName=ms-vscode-remote.vscode-remote-extensionpack). Basically it lets you SSH into the VM, so that you can write code in VSCode and execute it in the VM with GPU. This means I can use all the features provided by my beloved code editor (dark theme, code linting, code generation with CoPilot, etc.). Basically my development experience will remain the same (it can be jarring to switch between different editors, since my muscle memory is already tied to VSCode).

You can install the extension via the above link. To connect, open command palette with Ctrl-Shift-P (or Cmd-Shift-P on Mac, this is one of the muscle memory thing I was talking about), type and choose Remote-SSH: Add New SSH Host → copy and paste in the SSH string you’ve got from a previous step → choose the directory to save config (just choose the default). 

Once this is done, VSCode will have a pop up asking you to connect (just press connect). Otherwise, Ctrl-Shift-P and choose Remote-SSH: Connect to SSH Host and choose the VM you’ve just added.

{% include figure.liquid path="assets/img/posts/renting_gpus/ssh_connect_vscode.png"  class="img-fluid z-depth-1" style = "width:75%" %}

And you’re ready to code. If you’re already familiar with VSCode then I think you can find your way from here on in.

# Tmux

One final trick that I’ve just recently learn is Tmux. If you’ve used Colab then you know that as soon as you’re disconnected (say, your laptop goes to sleep), then your programm stops running and you’ll have to restart – which can be quite frustrating. Same goes for GPU renting.

To avoid this, you can use Tmux. At its most simple, Tmux creates a persistent terminal session that will keep running even if your local machine is temporarily disconnects from the VM. 

By default, the VMs on vastai start in a tmux session. But if your some reason it doesn’t (or you’re like me and you deactivate tmux be default by running `touch ~/.no_auto_tmux`), then you can create a new session by running:

```bash
tmux new -s session_name
```

From here you can run your program. Beware that for some reason you can’t just run, say `python run_weight_pruning.py` but you have to provide the absolute path to both your Python executable and your script, which looks something like

```bash
/venv/main/bin/python /workspace/DeepLearningLLM/run_weight_pruning.py
```

To know the Python path, run this in your terminal `which python` or `which python3`.To know the path to your file, in VSCode right click on the file and click Copy Path.

When you are disconnected from the VM for any reason, you can just SSH into the machine again and reconnect to the tmux session by running:

```bash
tmux attach -t session_name
```

and see that whatever program you’ve start is still running or have finished without interruption.

For more about tmux and its command, look up “tmux cheat sheet” on Google.

# Terminating the GPU instance

Once you’re done training your ML model, be sure to terminate the VM session otherwise vastai will charge you money. On the vastai UI there’s a Destroy instance button (self-explanatory). Next time you need to use GPU again, just rent another one and repeat this setup process.

# Summary

So that’s how I did some of my assignments this semester. As you’ve seen, renting and paying isn’t the problem, mostly it’s the setting up and getting used to the process that is most time consuming. I personally keep a bash file around so I can run it every time I need to rent a new machine, which includes all the commands I’ve listed in this post. It looks something like this:

```bash
#!/bin/bash

# cat ~/.ssh/id_rsa_gpu.pub

touch ~/.no_auto_tmux

echo "🔑 Adding your private key to authorized_keys..."
mkdir -p ~/.ssh

# Add private key (assumes you copy this script + key to instance or SCP it)
cat << 'EOF' > ~/.ssh/id_rsa
content_of_private_key
EOF

chmod 600 ~/.ssh/id_rsa
chmod 700 ~/.ssh

eval `ssh-agent -s`
ssh-add ~/.ssh/id_rsa

# Avoid GitHub authenticity prompt
echo "🌐 Adding GitHub to known_hosts..."
ssh-keyscan github.com >> ~/.ssh/known_hosts
chmod 644 ~/.ssh/known_hosts

# Optional: Configure Git identity (needed for pushing)
git config --global user.name "my name"
git config --global user.email "my email"

echo "📂 Cloning GitHub repository..."
GITHUB_REPO="my repo link"
git clone "$GITHUB_REPO"
REPO_DIR="my repo name"                     # Folder name after cloning
cd "$REPO_DIR"

echo "🐍 Setting up Python virtual environment..."
VENV_NAME="my virtual environment name"                         # Virtual environment name
PYTHON_VERSION="python3.8.5"               # Change if needed
$PYTHON_VERSION -m venv "$VENV_NAME"
source "$VENV_NAME/bin/activate"

echo "📦 Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt
```