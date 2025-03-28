# Document structure
In this page you can find information about the structure and attributes of various documents related to the market. The most important message types related to the mFRR energy market are the bid document, activation document, bid availability document, reserve allocation result document, and the acknowledgement document.
## General document rules
* Dates and times should be in UTC, with the format YYYY-MM-DDThh:mm:ssZ. The last ‘Z’ stands for Zero and indicates UTC+0. The time period the document covers, however, should be in the same day in CET/CEST. This means the day is from 23:00 to 23:00 during winter time, and 22:00 to 22:00 during summer time.
* When changing from winter time to summer time, the document covers 23 hours (from 23:00 to 22:00). When changing from summer time to winter time, the document covers 25 hours (from 22:00 to 23:00).
* Each document must have a unique identifier in UUID format. 
## Bid Document
Bids are submitted to the mFRR Energy Market as *ReserveBid_MarketDocument*. Currently version 7.4 of the document is used. The document contains one or multiple Bid Time Series along with other document-wide information.
### Table of document attributes
### Example message
## Activation Document
Every 15 minutes, activation orders are sent for bids selected for scheduled activation (SA) as an *Activation_MarketDocument*. Bids can also be selected for direct activation (DA) between QH-7.5 and QH+6 minutes. A single Activation Document may contain activation orders for one or multiple bids. 

The BSP receiving activation messages sends an acknowledgement document to confirm the activation order has been received. Additionally, the BSP sends an activation response message as an *Activation_MarketDocument* to confirm whether the activation orders can or cannot be fulfilled.
### Table of document attributes
### Example message
## Availability Document
After the 15-minute market period ends, an Availability Document is sent to the BSPs containing the bids that had been unavailable in the MTU, along with reasons why they were set as unavailable. Additionally, if a BSP causes an invalid conditional link by cancelling a linked bid, they will be immediately notified of such unavailabilities with an Availability Document.
### Table of document attributes
### Example message
## Reserve Allocation Result Document
After each imbalance settlement period (ISP), BSPs receive a report of every bid activated as a *ReserveAllocationResult_MarketDocument.*
### Table of document attributes
### Example message
## Acknowledgement Document
BSPs receive an Acknowledgement Document for every Bid Document they send to the TSO. Additionally, BSPs send an Acknowledgement Document of their own in response to activation orders.
### Table of document attributes
### Example message
