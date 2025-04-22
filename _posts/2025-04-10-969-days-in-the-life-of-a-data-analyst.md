---
layout: post
title: 969 days in the life of a data analyst
date: 2025-04-10
description: A summary of what I did in my previous industry job as a Data Analyst
tags: data-analytics, data-science, machine-learning
categories: work
giscus_comments: true
---

<p style="text-align: justify;">Before my Master's, I worked as a&nbsp;<strong>Data Analyst</strong> at <a href="https://onemount.com/" target="_blank" rel="noopener"><strong>One Mount Group</strong></a> (leading tech ecosystem with 3 digital products) from Oct 2021 until May 2024. I was recruited by the Talent Incubation Program (Fresh Geeks) and was mentored by <a href="https://www.linkedin.com/in/vuhoangt/">Vu Hoang</a> (now PhD Student in Information Systems, CMU). I started in the <a href="https://vinid.net/">VinID</a> analytics team (lifestyle &amp; fintech app, 13+ million users) and then worked simultaneously in the&nbsp;<a href="https://onehousing.vn/">OneHousing</a> team (proptech, 1-2 million monthly traffic) from mid 2022.</p>

<center> <img style='width:50%' src='https://media.licdn.com/dms/image/v2/D5622AQHrgyBnsvx2Pw/feedshare-shrink_1280/feedshare-shrink_1280/0/1717167494624?e=1748476800&v=beta&t=Oo5E7MI1usjCr7oPibWOcfJr0_eAI-Y2ZRvPxWUP0sA'>
<p>My employee card. Looks very cool doesn't it?</p>
</center>


<p style="text-align: justify;">My work at One Mount revolved around three pillars: <strong>Business Intelligence</strong> (analytics &amp; reporting), <strong>Data Engineering&nbsp;</strong>and<strong> Machine Learning</strong>. Some tasks were unconventional for an analyst, due to my tendency to gravitate towards more technical and experimental work.</p>
<p style="text-align: justify;">Below is an non-exhaustive list of the projects I contributed to along with what I did and what I learnt. I do my best to describe them without revealing sensitive information.</p>
<p style="padding-left: 40px; text-align: justify;"><strong>Machine Learning</strong>:</p>
<details style="padding-left: 40px;">
<summary><em>(2023) VinID Customer Income Prediction (xgboost)</em></summary>
I leveraged our existing features store and experimented with XGBoost to classify customer into 3 income ranges (multi-class classification). The project was unsuccessful due to the lack of meaningful predictors, and time mismatch between labels (collected in 2019) and features (no data from 2019, so we used data from 2020-2022 as proxy).</details>
<details style="padding-left: 40px;">
<summary><em>(2023) VinID Voucher attributes (decision tree)</em></summary>
I fitted a decision tree on vouchers with high/low redemption rate and interpreted the tree to identify the most important attributes of a voucher that would affect its redemption.</details>
<details style="padding-left: 40px;">
<summary><em>(2022) Onehousing x VinID Lookalike customers (catboost)</em></summary>
I used a catboost model (binary classification) to identify customers that are similar to existing homebuyers, using features store from VinID. I also engineered some new features that was considered of high importance by the model. I learnt how to formalize business questions into data science problems, to diagnose the model's performance, and to automate steps in the machine learning pipelines to facilitate experimentations. This was also my first exposure to the imbalanced learning problem.</details>
<details style="padding-left: 40px;">
<summary><em>(2022) VinID Notification Interaction Prediction (catboost)</em></summary>
I used a catboost model to identify customers that are likely to interact with a notification. I also engineered some new features. I learnt how to quickly experiment with different model configurations and feature combinations.</details>
<details style="padding-left: 40px;">
<summary><em>(2021) VinID Winmart holiday sales prediction (Prophet)</em></summary>
I attempted to predict 2022 Tet holiday item-level sales using the Facebook's Prophet library. The model was unsuccessful due to the lack of representative data, as the 2021 data was heavily skewed by the COVID-19 pandemic. This is my first exposure to predictive analytics and time series problems.</details>
<p style="padding-left: 40px; text-align: justify;">&nbsp;</p>
<p style="padding-left: 40px; text-align: justify;"><strong>Analytics Projects:</strong></p>
<details style="padding-left: 40px;">
<summary><em>(2024) Onehousing Customer Journey Analysis</em></summary>
We analyzed the common paths (each step is a feature on the site) customers took after entering our website. We learnt that there was not a clear common path due to a lack of internal links between pages.</details>
<details style="padding-left: 40px;">
<summary><em>(2023) Onehousing Non-Listing Content Problem</em></summary>
We explored the behavior of organic users (i.e, they found our website via Google) and attempted to find patterns that would identify high-likelihood house buyers. I led the initiative along with two other analysts, proposed ideas to track the behavior, proposed a metric that corresponded with high retention, and did the early exploratory analysis. I also informed the data tracking template and data warehouse design for this problem.</details>
<details style="padding-left: 40px;">
<summary><em>(2022) Onehousing x VinID Growth Project</em></summary>
We linked customer attributes (demographic, socio-economic, spatial data, etc.) to real estate purchasing behavior to identify key customer segments. My team and I provided early insights on customer profile informing acquisition strategy, I proposed data collection and experimentation method, and built a dashboard to monitor key project metrics.</details>
<p style="padding-left: 40px; text-align: justify;">&nbsp;</p>
<p style="padding-left: 40px; text-align: justify;"><strong>Data Engineering</strong>:</p>
<details style="padding-left: 40px;">
<summary><em>(2023) Onehousing Alert Engine (Python, SQL, dbt, Airflow)</em></summary>
I designed and developed a system that automatically detects mismatched records between two data sources and sends alerts to the Operations and Sales teams. This helps significantly reduce the time spent on data reconciliation. I learnt to thinking in systems.</details>
<details style="padding-left: 40px;">
<summary><em>(2023) Onehousing CEO Daily Update Bot (Python, SQL, dbt, Airflow)</em></summary>
I built a script that sends daily Slack updates to the CEO about real estate deals in OneHousing. I learnt how to work with the Slack and Tableau API, as well as PyODBC.</details>
<details style="padding-left: 40px;">
<summary><em>(2023) VinID Voucher, Notification, Ticketing Datamart (dimensional datawarehouse design)</em></summary>
I designed and built dimensional datamarts for the various VinID business functions, which contain data about vouchers, app notification, and ticketing. I learnt a lot about dimensional modelling and data warehouse design in the process.</details>
<details style="padding-left: 40px;">
<summary><em>(2022) VinID Data Platform Migration (BigQuery -&gt; Dremio)</em></summary>
We changed our data platform and query engine from Bigquery to Dremio. I re-wrote and optimized SQL queries and data pipelines to fit the new platform. I learnt ELT best practices, most of my subsequent pipelines adhered to <a href="https://docs.getdbt.com/best-practices/how-we-style/0-how-we-style-our-dbt-projects" target="_blank" rel="noopener">dbt style guide</a>.</details>
<details style="padding-left: 40px;">
<summary><em>All dashboards/reports/models data pipelines (SQL, dbt, Airflow)</em></summary>
I built data processing pipelines (partially or entirely) for all projects that I was involved in. I learnt how write readable code and manage my code with Git.</details>
<p style="padding-left: 40px; text-align: justify;">&nbsp;</p>
<p style="padding-left: 40px; text-align: justify;"><strong>Dashboards:</strong></p>
<details style="padding-left: 40px;">
<summary><em> (2024) Onehousing Marketing Dashboard (Power BI)</em></summary>
We built executive dashboard for high-level metrics (acqured users, MAU, lead funnel, etc.) of the OneHousing website, with detailed analytical views for specific marketing functions. I learnt how to work with Power BI.&nbsp;</details>
<details style="padding-left: 40px;">
<summary><em> (2023) Onehousing Online-to-Offline Dashboard (Tableau)</em></summary>
I built an operational dashboard to monitor detailed lead generation and conversion activities by salespeople.</details>
<details style="padding-left: 40px;">
<summary><em> (2022) VinID Ticketing Dashboard (Superset)</em></summary>
I built an operational dashboard about on-app ticket sales (concerts, football matches, recreational parks etc.) and conversion funnel.</details>
<details style="padding-left: 40px;">
<summary><em>(2021) VinID OneView (web-based &amp; Looker Studio)<br></em></summary>
We built a centralized business intelligence platform, containing company-wise key metrics for C-level executives (MTU, MAU, etc.). I built 2 high-level dashboards in 2021: Merchant (about voucher metrics such as claims/redeems) and Product (about north-star app metrics) and I took over as sole maintainer of all related data pipelines in 2022 (200+ tables). I learnt how to debug and track down data errors in a complex pipelines.</details>