---
layout: post
title: Quick introduction to Federated Learning
date: 2025-04-05
description: A short technical introduction to federated learning, a framework for privacy preserving machine learning.
tags: data-science, machine-learning, data-privacy, deep-learning
categories: study
giscus_comments: true
toc:
  beginning: true
---
# Centralized Machine Learning
In traditional machine learning, all the data is stored in one place and computation all happens on one computer (roughly speaking). The machine learning problem is formalized as minimizing a loss function with respect to the weights.

\begin{equation}
\min_{w \in \mathbb{R}^d} f(w)
\quad
\textrm{where}
\quad
f(w) \overset{\text{def}}{=} \frac{1}{n} \sum_{i=1}^n f_i(w)
\end{equation}

- $f_i(w)$: Loss (error) on one example, i.e., $\ell(x_i, y_i; w)$
- $f(w)$: Average loss on predictions made with parameters $w$


And the loss function can be optimized using gradient descent. Each update is:

\begin{equation}
w_{t+1} \leftarrow w_t - \eta \nabla f(w_t)
\end{equation}

- $\nabla f(w_t)$: Gradient of the loss function
- $\eta$: Learning rate

The weights are updated iteratively until convergence or after a certain amount of times.

# Privacy Concerns

As mentioned, to do centralized learning, all the data would need to be sent to one server for compute. This, of course, raises privacy concerns, especially if the training data contains some sensitive information about an user. For example, a keyboard suggestions model would need to collect data on what an user types.

<a href="https://research.google/blog/federated-learning-collaborative-machine-learning-without-centralized-training-data/">The solution</a> proposed by Google (McMahan et al. 2016) is to distribute the data and the training. Continuing from the keyboard suggestion model, all the data would stay on the user&rsquo;s phone, and the model training will happen on the device as well. They dubbed their method <strong>Federated Learning</strong>. Since its introduction by Google, some other big companies have used federated learning as well, including <a href="https://oreil.ly/IRKAw" target="_blank" rel="noopener noreferrer">Apple</a>,&nbsp;<a href="https://oreil.ly/YXk1C" target="_blank" rel="noopener noreferrer">NVIDIA</a>, and&nbsp;<a href="https://oreil.ly/e2kGc" target="_blank" rel="noopener noreferrer">Amazon Web Services</a>.

<img style="display: block; margin-left: auto; margin-right: auto;" src="https://storage.googleapis.com/gweb-research2023-media/images/1de1662a7e06d2ee886391a458652fcd-F.width-800.format-jpeg.jpg" alt="" width="75%">
The next parts will outline how to do federated learning.

# Federated Learning
Federated learning is a procedure where training takes place locally so that there is no need to send data out of the local device. In this process, there will be a centralized server (say, the Google server), and there will be K clients (say K Android users).
Learning takes place as follows:

1. Initialization: At the start of the process, the federated learning server will send a global model (i.e: weights) to the clients. This model could be a pre-trained keyboard suggestion model trained on some public dataset.
1. Local training: The clients will perform training (i.e: gradient descent update steps) using their local data.
1. Transmission: The clients will send the updated weights back to the server.
1. Aggregation: The server will take the weighted average of the received models from clients to be the new global model.

The process is repeated until convergence or after some predefined number of steps.
As you can see, only the model weights are sent to the server, the data stays on the users&rsquo; phones.

# Local Training with FedSGD

When the model is trained on a single device, we simply calculate the loss function for that client. And the loss function for the global model is the weighted average of all local losses (*). Intuitively, a client with more data points will contribute more towards the global loss.

\begin{equation}
f(w) = \sum_{k=1}^{K} \frac{n_k}{n} F_k(w)
\quad
\text{where}
\quad
F_k(w) = \frac{1}{n_k} \sum_{i \in \mathcal{P}_k} f_i(w).
\end{equation}

- $F_k(w)$: Average lost for a single client
- $f(w)$: Weighted average of $F_k(w)$
  
When performing gradient descent, the global weights is updated using the weighted average of the local gradients (gradients calculated on local data).

\begin{equation}
w_{t+1} \leftarrow w_t - \eta \sum_{k=1}^K \frac{n_k}{n} g_k 
\end{equation}

- $g_k$: Average gradient on local data $\nabla F_k(w_t)$

This is done iteratively until... well you get the point.

(*) This assumes that data across clients are i.i.d (independently and identically distributed). In practice, it is often the case some some client data are skewed (Zhao et al. 2018), which causes divergence problems. For possible remedy using FedProx, see Li et al. 2020.

# Reducing Communication Rounds with FedAvg

In the simple FedSGD algorithm, each gradient descent step will incur one round of transmission. Imagine training a model with 100 epochs, that means all clients will have to send (and receive) model weights 100 times. This is inefficient (and for that matter, increases privacy risks that I won&rsquo;t elaborate here).

To reduce the number of communication rounds, we can perform multiple gradient descent updates locally. And afterwards, we use a weighted average of all the local models as the new global model.

\begin{equation}
    w_{t+1}^{k} = w_t - \eta g_k
\end{equation}

\begin{equation}
    w_{t+1} \leftarrow \sum_{k=1}^K \frac{n_k}{n} w_{t+1}^{k}
\end{equation}
    
- $w_{t+1}^{k}$: Local weight for client $k$ in iteration $t+1$



Notice that with FedSGD, the <strong>local gradients</strong> are sent back to the server, whereas in FedAvg, the <strong>local weights</strong> (updated after several epochs) are sent instead. Moreover, the gradients are only transmitted after some number of epochs (as opposed to every epoch), thus reducing the number of communication rounds.

# Challenges
While federated learning reduces privacy risks by keeping the data local while training the model instead of sending it to the server, it is still vulnerable to some other types of attack such as gradient inversion attack (Geiping et al. 2020) or membership inference attack. I will leave the of elaboration these risks as well as potential defenses to my future self as homework. (It literally is my homework, due in about 5 days).

# References

[1] McMahan, B., Moore, E., Ramage, D., Hampson, S. &amp; Arcas, B.A.y.. (2017). Communication-Efficient Learning of Deep Networks from Decentralized Data. <em>Proceedings of the 20th International Conference on Artificial Intelligence and Statistics</em>, in <em>Proceedings of Machine Learning Research</em> 54:1273-1282

[2] Geiping, J., Bauermeister, H., Dr&ouml;ge, H., &amp; Moeller, M. (2020). Inverting gradients-how easy is it to break privacy in federated learning?.&nbsp;<em>Advances in neural information processing systems</em>,&nbsp;<em>33</em>, 16937-16947.

[3] Zhao, Y., Li, M., Lai, L., Suda, N., Civin, D., &amp; Chandra, V. (2018). Federated learning with non-iid data.&nbsp;<em>arXiv preprint arXiv:1806.00582</em>.&nbsp;

[4] Li, T., Sahu, A. K., Zaheer, M., Sanjabi, M., Talwalkar, A., &amp; Smith, V. (2020). Federated optimization in heterogeneous networks.&nbsp;<em>Proceedings of Machine learning and systems</em>,&nbsp;<em>2</em>, 429-450.&nbsp;

[5]&nbsp;<a href="https://research.google/blog/federated-learning-collaborative-machine-learning-without-centralized-training-data/" target="_blank" rel="noopener">Federated Learning: Collaborative Machine Learning without Centralized Training Data</a>&nbsp;
