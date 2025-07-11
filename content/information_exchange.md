# Information Exchange

## Overview
There are several different ways to exchange information in reserve markets. Some of the methods are connected only to certain markets. The market specifig guidelines explains in detail what protocols are to be used and how the message exchange works. This site will give an overall understanding of the options. 

The main channels for information exchange between balancing service providers and Fingrid are:
* ECP/EDX
* Vaksi
* EDI Messages
* ICCP
* RT Lite

## ECP/EDX
ECP (Energy Communication Platform) is used for Bid submission, receiving market results and electronic activation for mFRR-bids.

EDX is an extension to ECP, and is used to define the network configuration, and introduces the concept of services, service providers and consumers. The two central parts of the EDX network is the service catalogue and the
toolbox. An EDX network consists of multiple toolboxes and a single service catalogue. These components communicates via ECP and is responsible for distribution of the network configuration. Messaging occurs directly between the toolboxes

## Vaksi
Vaksi is the web user interface for the markets Fingrid is respobsible of. It is used for bid submission, receiving market results adn electronic activation for mFRR-bids. 

## EDI
EDI Messages are used for receiving market results, delivering reserve plans for yearly market

## ICCP
ICCP is used for real-time reporting and activation. It can only be used over FEN / KoVa FEN network. Another supported option for ICCP protocol is IEC 60870-5-104. 

## RT Lite
RT Lite is a web service which has the same functions as the ICCP interface. It is targeted for smaller participants which do not have real time control systems to support ICCP. 
