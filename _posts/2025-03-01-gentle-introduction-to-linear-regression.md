---
layout: post
title: Gentle introduction to Linear Regression
date: 2025-03-01
description: A gentle introduction to the simplest machine learning problem, linear regression.
tags: data-science, machine-learning
categories: study
giscus_comments: true
toc:
  beginning: true
---
<h1>The problem</h1>
<p>Consider this problem: You are looking to buy a new house. You know some information about the property: the area of each floor, the number of bedrooms,&hellip; Now, you want to know how much you should be paying for that building. <em>How would you go about estimating its price?</em></p>
<p>You could, in theory, go to some real estate guru and they would tell you, based on their knowledge and experience and whatnot, how much they think the house is worth. However, this manual approach may have some downsides: an expert&rsquo;s estimate could be costly, slow and biased / subjective.</p>
<p>Now, suppose you already have some historical data about other houses and their prices, then you can turn to machine learning to get a cheap and <em>unbiased</em> estimate.</p>

{% include figure.liquid path="assets/img/posts/lr_data_table.png"  class="img-fluid z-depth-1" style = "width:75%" %}

<h1>The data</h1>
<p>(The dataset I used as example can be downloaded from Kaggle <a href="https://www.kaggle.com/datasets/lespin/house-prices-dataset">at this link</a>).</p>
<p>Let&rsquo;s take a look at our dataset. The data we have is stored in a table, made up of 1460 rows and 6 columns. Each row represent a &ldquo;<em>data point</em>&rdquo; or &ldquo;<em>example</em>&rdquo; (in this case, each row is a house), and the columns are information we have on example. The column SalePrice is the value that we are trying to predict for future houses, it is usually called the &ldquo;<em>target"</em>&nbsp;or the &ldquo;<em>label</em>&rdquo;. The rest of the columns are information that we will use to make our prediction, and they are called &ldquo;<em>features</em>&rdquo;.</p>
<p>For your convenience, I shall describe each of the feature below. When the data is structured (it comes in a table) and each feature has its own meaning, it is often helpful to understand the features and how it relates to our target.</p>
<ul>
<li><strong>OverallQual</strong>: Overall material and finish quality (from 1 to 10)</li>
<li><span class="sc-jhZTHU dVJzog"><strong>BedroomAbvGr</strong>: Bedrooms above grade&nbsp;</span></li>
<li><strong>GarageCars</strong>: Size of garage in car capacity</li>
<li><strong>FullBath</strong>: Full bathrooms above grade</li>
<li><strong>GrLivArea</strong>: Above grade (ground) living area square feet</li>
</ul>
<p>By machine learning convention, we usually divide the dataset into two parts: 80% of the rows will be used for training, and 20% will be used for testing. (We reserve the 20% testing set to simulate the fact that real world, our model will make predictions on data it has not seen before - we shall see how it is used to evaluate our model in a later section). We denote the number of examples used for training as \(N\), and the number of features as \(P\). In this case, \(P = 5\) and \(N = 1168\).</p>
<p>Now if you squint your eyes hard enough, this table sort of looks like&hellip; a matrix. For the features, it is a matrix of \(N\) rows and \(P\) columns. For the label, it is a matrix of \(N\) rows and \(1\) column (equivalently, a column vector). We call the matrix for the features \(X\), and the label vector \(y\). (The \(y\) is in lowercase because it is a vector, whereas \(X\) is a matrix). Formally, \(X \in \mathbb{R} ^ {N \times P}\) and \(y \in \mathbb{R} ^{P}\).</p>

{% include figure.liquid path="assets/img/posts/lr_data_table_matrix.png"  class="img-fluid z-depth-1" style = "width:75%" %}

<p>And here is the matrices written out explicitly:</p>
<p style="text-align: center;">\( \mathbf{X} = \begin{bmatrix} 7 &amp; 3 &amp; 2 &amp; 2 &amp; 1710 \\ 6 &amp; 3 &amp; 2 &amp; 2 &amp; 1262 \\ 7 &amp; 3 &amp; 2 &amp; 2 &amp; 1786 \\ 7 &amp; 3 &amp; 3 &amp; 1 &amp; 1717 \\ 8 &amp; 4 &amp; 3 &amp; 2 &amp; 2198 \\ \vdots &amp; \vdots &amp; \vdots &amp; \vdots &amp; \vdots \\ 6 &amp; 3 &amp; 2 &amp; 2 &amp; 1647 \\ 6 &amp; 3 &amp; 2 &amp; 2 &amp; 2073 \\ 7 &amp; 4 &amp; 1 &amp; 2 &amp; 2340 \\ 5 &amp; 2 &amp; 1 &amp; 1 &amp; 1078 \\ 5 &amp; 3 &amp; 1 &amp; 1 &amp; 1256 \end{bmatrix} \)</p>
<p style="text-align: center;">\( y = \begin{bmatrix} 208500 \\ 181500 \\ 223500 \\ 140000 \\ 250000 \\ \vdots \\ 175000 \\ 210000 \\ 266500 \\ 142125 \\ 147500 \end{bmatrix} \)</p>
<p style="text-align: left;">Writing a column vector be burdensome, so sometimes we can write one as a row vector than add a little \(^T\) (meaning "transposed") at the end, like this:&nbsp;</p>
<p style="text-align: left;">\( y = [208500, 181500, ..., 142125, 147500]^T \)</p>
<p>To add just a little bit more notation: we shall use superscript numbers \(^{(i)}\) to denote the \(i^{th}\) row, and the subscript number \(_m\) to denote the \(m^{th}\) column. For example, you can see that \(x^{(1)} = [7, 3, 2, 2, 1710]\) (the first row), \(x_1 = [7, 6, 7, 7, 8, &hellip;]\) (the first column OverallQual) and \(x^{(1)}_5 = 1710\).</p>
<h1>The model</h1>
<p>The premise of machine learning is this: there exists a model (sort of a math function) that can accurately represent the relationship between the features and the target for each training example (also for unseen data), which we shall estimate from the data. Formally: give N training examples (\(x^{(1)}, y^{(1)}\)), (\(x^{(2)}, y^{(2)}\)), &hellip; (\(x^{(N)}, y^{(N)}\)), we aim to learn a mapping \(f: x &rarr; y\) by requiring \(f(x^{(i)}) = y^{(i)}\); such that for any unseen \(x^*\)<em>, </em>\(f(x^*) = y^*\) (or something along those lines).</p>
<p>We start by defining a model that represents the relationship between X and y. And by &ldquo;defining&rdquo; I mean literally guessing because a model is, more or less, our assumption of how X and y is related; and we can try out different models to see which one most accurately captures how X affects y.</p>
<p>Say, we hypothesize that the price of a house has a linear relationship with the features OverallQual, BedroomAvgGr,&hellip; A linear relationship is one where when OverallQual increases by 1, then SalePrice will always increases by some fixed amount.&nbsp;</p>
<p>We now have a model called <strong>Linear Regression</strong>. &ldquo;Regression&rdquo; is when our target takes continuous values (which SalePrice does), and &ldquo;Linear&rdquo; because as you see, \(y\) (SalePrice) is a linear combination of \(x\). This is the simplest model that you can come up with in machine learning.</p>
<p>The functional form looks like this:</p>
<p style="text-align: center;">\( f(x) = \beta_1 \cdot x_1 + \beta_2 \cdot x_2 + ...+ \beta_P \cdot x_P + \beta_0 \cdot 1 \)</p>
<p>where \(\beta_0\) to \(\beta_P\) (pronounced &ldquo;beta&rdquo;) are &ldquo;learnable&rdquo; parameters (because there value will be &ldquo;learnt&rdquo; from the data, we shall see this later). \(\beta_0\) in particular is a thing called the &ldquo;bias term&rdquo; (or the &ldquo;intercept&rdquo; in statistics), but I will pretend like it&rsquo;s just another parameter like the other \(\beta\), because it is estimated in the exact same way.</p>
<p>Using vector notation, we can succinctly write the model as:</p>
<p style="text-align: center;">\( f(x) = X \cdot \beta \)</p>
<p>where \(X\) is the feature matrix \(X = [x_1, x_2, &hellip;, x_p]\) (each \(x_m\) is a column as we have seen above) and \(\beta\) is a column vector \( \beta = [\beta_1, \beta_2, &hellip;, \beta_p]^T\). You may verify that the dot product operation \(X \cdot \beta \) indeed results in the linear combination in the previous formula.</p>
<p>To add just one more bit of notation: after we have obtained \(\beta\), we can plug its values into the model and get some prediction for SalePrice, but its output will be slightly different from the true SalePrice. We call the predictions made by the model \(\hat{y}\) (pronounced y-hat). From now on, we will use the hat notation to denote anything that is estimated from data, and not ground truth data itself.</p>
<p>We can write:</p>
<p style="text-align: center;">\( \hat{y} = f(x) = X \cdot \beta \)</p>
<p>Now, how do we train the model to learn \(\beta\)?</p>
<h1>The learning</h1>
<p>As we mentioned above, the objective of machine learning is to estimate a model that give an accurate approximate of some \(y^*\)<em>&nbsp;</em>when given some new data \(x^*\). In Linear Regression, we assume that the existing data and new data follow the same distribution and that the two don't affect each other's value (the "identically and independently distributed" or i.i.d assumption). In other words, we assume that when the model makes good predictions on existing data, it will also make good predictions on new data.</p>
<p>How do we "train" the model to make good prediction for \(y\) based on existing data \(x\)? We can quantify the goodness of our model by measuring the error, i.e: how wrong the model is, using something called the "loss function".&nbsp; By minimizing the loss function, we get a model that is most accurate on existing data.&nbsp;</p>
<p>Just bear with me for a minute to see how to minimize this and what this has to do with learning \(\beta\).</p>
<p>In Linear Regression, the popular loss function to use is the Mean Squared Error (MSE):&nbsp;</p>
<p style="text-align: center;">\( MSE = \frac{1}{n}\displaystyle\sum_{i=1}^N(\hat{y}^{(i)} - y^{(i)})^2 \)</p>
<p>This loss function does exactly what it name says:</p>
<ul>
<li>for each training example,
<ul>
<li>measure how wrong the prediction is by subtracting the prediction from the true value, (error)</li>
<li>square that up so negative difference is the same as positive difference (e.g: if the true value is 100, then a prediction of 97 is just as wrong as a prediction of 103), (squared)</li>
</ul>
</li>
<li>take the average over all training examples (mean)</li>
</ul>
<p>In vector form, the loss function can be written like this: (again, feel free to verify that it is the same operation):</p>
<p style="text-align: center;">\( MSE = \frac{1}{n}(\hat{y}-y)^T(\hat{y}-y) \)</p>
<p>where \(\hat{y}\) and \(y\) are both column vectors, \(\hat{y} - y\) is therefore a column vector and \((\hat{y} - y)^T\) is the transpose of that vector. This dot product operation will result in squares of each element in \(\hat{y}\) and \(y\).</p>
<p>Now, we can substitute \(\hat{y} = X \cdot \beta\) into this and get</p>
<p style="text-align: center;">\( MSE = \frac{1}{n}(X \beta - y)^T(X\beta - y) \)</p>
<p>In this function, we already know \(X\) and \(y\) (that is our given data), so the only unknown variable is \(\beta\). Our objective now is to find the values for \(\beta\) that will minimize MSE. Our machine learning problem (and most ML models) can be viewed as a function optimization problem (i.e: we are always trying to minimize some loss function).</p>
<p><span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">This particular loss function for linear regression is convex, which we can find a closed form solution to this minimization problem. We obtain the solution by setting the partial derivative of function with respect to \(\beta\) to \(0\) and solve for \(\beta\). Formally:</span></p>
<p style="text-align: center;">\( \frac{\delta \frac{1}{n}(X \beta - y)^T(X\beta - y)}{\delta{\beta}} = 0 \)</p>
<p>Using vector calculus magic we can get the left hand side of the equation to the following. I will leave out the step by step details because it&rsquo;s quite complicated, so comment or DM me if you want to know how to actually derive this.</p>
<p style="text-align: center;">\( X^TX\beta - X^Ty = 0 \)</p>
<p>Solving for \(\beta\) we will get: (*)</p>
<p style="text-align: center;">\( \beta = (X^TX)^{-1}X^Ty \) (**)</p>
<p>This, ladies and gentlemen<strong>, is our machine learning model.</strong></p>
<p>(*) The method we are using is equivalent to the Ordinary Least Squares method in Statistics.</p>
<p>(**) The implicit implication in writing \((X^TX)^{-1}\) is that the matrix \( X^TX \) has an inverse. The informed readers may realize not all matrices are invertible. However, dealing with this is another topic I won't cover in this post.</p>
<h1>Evaluation</h1>
<p>That last part was quite a handful, especially if you are not too familiar with linear algebra and calculus. Don&rsquo;t worry though, in my class of over 100 people, I can see only one single guy that can follow along this particular lecture (or any lecture in Machine Learning, for that matter).</p>
<p>What I want you to take away is this: our machine learning model is, in the end, obtained a bunch of matrix multiplication involving \(X\) and \(y\), which is our original data table.</p>
<p>And you might ask yourself: How does that even work? Like, how does such a model have any predictive power?</p>
<p>Surprisingly, it does kinda work. And even more surprisingly, lots of AI models kinda work in the same way.</p>
<p>If you download the dataset and try to calculate the parameters in beta for yourself (can be done using Excel if you are not familiar with Python), then you will get the following results :</p>
$$
\displaylines
{
  \beta_1 = 25111.14712806\\
  \beta_2 = -9149.25660938\\
  \beta_3 = 21069.61456549\\
  \beta_4 = 1927.11001388\\
  \beta_5 = 56.44300459\\
  \beta_0 =-72622.68631023428
}
$$

<p>We can make prediction to obtain \(\hat{y}\) for the 20% we reserved in the beginning. To evaluate its accuracy, we can use the Root Mean Squared Error (the square root of the above MSE - we are using the square root because it is in the same unit as our target variable). In this case:</p>
<p>\(RMSE = 41832.23667930187\)</p>
<p>So when we use this model to estimate house prices, its output is, on average, about \$41k off the actual price. Considering that the average price is around \$180k, this is not completely terrible.</p>
<p>We can examine this in a bit more details by plotting the Predicted Price and the Actual Price. The closer the points are to the red line, the smaller the error. If a model is 100% accurate, all the dots will be on the red line, hence error will be 0. You can see that the model does pretty well for houses worth below $350k, it is the extremely expensive houses (400k and above) that the model struggles with.</p>
<p><img style="display: block; margin-left: auto; margin-right: auto;" src="blob:https://giangson.me/fc3458a3-04bc-4d62-a61d-220e4862e25c" width="50%"></p>
<p>And the effectiveness of this model can be due to a few reasons:</p>
<ul>
<li>First, the model we chose (linear regression) is rather a decent choice for a model because lots of variables in the real world follow a linear relationship. Not all relationships are linear, but a lot.</li>
<li>Second, the method that we solved for the model&rsquo;s parameters practically ensures that the predictions, on average, are as close to the real values as possible.&nbsp;</li>
</ul>
<p>There are ways to improve the model and drive down the error. Namely, we can choose a more complex model (say, one that can captures non-linear relationships). Or we can incorporate more features into our model (the dataset has some 80+ features, I only used 5 to keep things simple). Or better yet, we do proper feature engineering and data preparation (which is where Data Science comes in). For instance, if I use a Random Forest models along with some clever feature engineering (combining some features to create a new one), I can get the error to as low as ~23k, which is quite the improvement compare to ~41k.</p>
<h1>Conclusion</h1>
<p>Well well, congratulations for making it to the end of the post. By now I hope you get a taste of what machine learning is about. Even though the model we used in this post is quite simple, it does provide some predictive power, and more importantly, it provides a basis for us to learn more complex models. Essentially, a lot of machine learning modeling can be simplified to the steps that we have followed here:</p>
<ul>
<li>Collect some data</li>
<li>Specify a model</li>
<li>Define a loss function</li>
<li>Find the parameters that minimize the loss function</li>
</ul>
<p>And even some of the math that we did here will come up again in other models, assuming that I will continue writing on machine learning. Do drop a comment if you want to see more.</p>
<p>Until then, you may find the Python code for this model <a href="https://github.com/giangson19/gentle_ml/blob/main/linear_regression_housing_prices.ipynb">at this link</a> (for those unfamiliar with Python, please comment if you want some explanation).</p>