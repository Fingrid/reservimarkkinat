## Message Types

The table below displays the EDX message types used for communication between BSPs and Fingrid. 

### mFRR energy market

| Direction | Message  | MessageType | EDX Service |
|----------|----------|----------|----------|
| BSP --> FG | mFRR energy bid | FI-MFRR-BID-CIM | FI-MFRR |
| BSP --> FG | Acknowledgement for electronic activation request | FI-MFRR-ACTIVATION-ORDER-CIM-ACK | FI-MFRR |
| BSP --> FG | Activation response | FI-MFRR-ACTIVATION-RESPONSE-CIM | FI-MFRR |
| BSP --> FG | Acknowledgement for bid unavailibility message | FI-MFRR-BIDAVAILABILITY-CIM-ACK | FI-MFRR |
| BSP --> FG | Acknowledgement for mFRR trades (activated bids) | FI-MFRR-TRADE-RESULTS-CIM-ACK | FI-MFRR |
| FG --> BSP | Acknowledgement for mFRR energy bid | FI-MFRR-BID-CIM-ACK | FI-MFRR |
| FG --> BSP | Activation request | FI-MFRR-ACTIVATION-ORDER-CIM | FI-MFRR |
| FG --> BSP | Acknowledgement for activation response | FI-MFRR-ACTIVATION-RESPONSE-CIM-ACK | FI-MFRR |
| FG --> BSP | Bid unavailability message | FI-MFRR-BIDAVAILABILITY-CIM | FI-MFRR |
| FG --> BSP | mFRR trades (activated bids)| FI-MFRR-TRADE-RESULTS-CIM | FI-MFRR |

### aFRR energy market

| Direction | Message  | MessageType | EDX Service |
|----------|----------|----------|----------|
| BSP --> FG | aFRR energy bid | FI-AFRR-BID-CIM | FI-AFRR |
| BSP --> FG | Acknowledgement for aFRR energy bid unavailability message | FI-AFRR-BIDAVAILABILITY-CIM-ACK | FI-AFRR |
| FG --> BSP | Acknowledgement for aFRR energy bid | FI-AFRR-BID-CIM-ACK | FI-AFRR |
| FG --> BSP | aFRR energy bid unavailability message | FI-AFRR-BIDAVAILABILITY-CIM | FI-AFRR |

### FCR capacity market

| Direction | Message  | MessageType | EDX Service |
|----------|----------|----------|----------|
| BSP --> FG | FCR-N/FCR-D up/down capacity bid | FI-FCR-BID-CIM | FI-FCR |
| BSP --> FG | Ack for FCR-N/FCR-D up/down result message (aggregated) | FI-FCR-RESERVERESULTS-ERRP-ACK | FI-FCR |
| BSP --> FG | Ack for FCR-N/FCR-D up/down result message (per bid) | FI-FCR-ACCEPTED-BIDS-CIM-ACK | FI-FCR |
| BSP --> FG | FCR yearly plan | FI-FCR-YEARLYPLAN-CIM | FI-FCR |
| FG --> BSP | Acknowledgement for FCR-N/FCR-D up/down capacity bid | FI-FCR-BID-CIM-ACK | FI-FCR |
| FG --> BSP | FCR-N/FCR-D up/down result message (aggregated) | FI-FCR-RESERVERESULTS-ERRP | FI-FCR |
| FG --> BSP | FCR-N/FCR-D up/down result message (per bid) | FI-FCR-ACCEPTED-BIDS-CIM  | FI-FCR |
| FG --> BSP | Acknowledgement for FCR yearly plan  | FI-FCR-YEARLYPLAN-CIM-ACK | FI-FCR |

### FFR capacity market

| Direction | Message  | MessageType | EDX Service |
|----------|----------|----------|----------|
| BSP --> FG | FFR capacity bid | FG-FFR-BID | FI-FFR |
| BSP --> FG | Ack for FFR result message (aggregated) | FI-FFR-RESERVERESULTS-ERRP-ACK | FI-FFR |
| BSP --> FG | Ack for FFR result message (per bid) | FI-FFR-ACCEPTED-BIDS-CIM-ACK | FI-FFR |
| FG --> BSP | Acknowledgement for FFR capacity bid | FG-FFR-BIDAck | FI-FFR |
| FG --> BSP | FFR result message (aggregated) | FI-FFR-RESERVERESULTS-ERRP | FI-FFR |
| FG --> BSP | FFR result message (per bid) | FI-FFR-ACCEPTED-BIDS-CIM  | FI-FFR |

### mFRR & aFRR capacity market
mFRR & aFRR capacity markets are running on the Nordic MMS -platform and BSPs submit bids directly to the Nordic platform. The messagetypes are descireb below. More information can be found in the nordic implementation guide for mFRR/aFRR capacity market here: https://nordicbalancingmodel.net/implementation-guides/

| Direction | Message  | MessageType | EDX Service |
|----------|----------|----------|----------|
| BSP --> FG | aFRR energy bid | FI-AFRR-BID-CIM | FI-AFRR |
| BSP --> FG | Acknowledgement for aFRR energy bid unavailability message | FI-AFRR-BIDAVAILABILITY-CIM-ACK | FI-AFRR |
| FG --> BSP | Acknowledgement for aFRR energy bid | FI-AFRR-BID-CIM-ACK | FI-AFRR |
| FG --> BSP | aFRR energy bid unavailability message | FI-AFRR-BIDAVAILABILITY-CIM | FI-AFRR |





