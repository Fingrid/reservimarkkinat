# Common Information Model - CIM
## Overview

The Common Information Model (CIM) is a standard developed by the International Electrotechnical Commission (IEC) for describing the information about an electrical network. The CIM is widely adopted by the European Network of Transmission System Operators for Electricity (ENTSO-E) to harmonize energy market data exchanges across Europe. This model facilitates the integration and interoperability of various systems used by Transmission System Operators (TSOs) and other market participants. Majority of the message exchange over ECP utilizes CIM. 

## Purpose and Benefits

The primary purpose of the CIM is to provide a common framework for representing power system resources and their attributes. This standardization enables different systems to exchange information seamlessly, reducing the complexity and cost associated with data integration. The key benefits of the CIM include:

- **Interoperability**: Ensures that different systems can work together effectively by providing a common language for data exchange.
- **Scalability**: Supports the integration of new systems and technologies without significant changes to the existing infrastructure.
- **Efficiency**: Reduces the time and effort required for data integration and management.
- **Accuracy**: Enhances the accuracy and consistency of data across different systems.

## Key Components

The CIM consists of several key components that define the structure and semantics of the data exchanged between systems. These components include:

### 1. CIM Model

The CIM model is a comprehensive representation of the power system, including its physical and logical components. It covers various aspects such as:

- **Network Topology**: Describes the physical layout of the electrical network, including substations, transformers, and transmission lines.
- **Operational Data**: Includes real-time data related to the operation of the power system, such as voltage levels, power flows, and equipment status.
- **Market Data**: Covers information related to energy markets, including bids, offers, and market prices.

### 2. CIM Profiles

CIM profiles are subsets of the CIM model tailored to specific use cases or applications. These profiles define the data elements and relationships relevant to a particular context, ensuring that only the necessary information is exchanged. Some common CIM profiles include:

- **Network Model Exchange (NME)**: Used for exchanging network topology and configuration data between TSOs.
- **Energy Market Information Exchange (EMIX)**: Facilitates the exchange of market-related data between market participants.
- **Outage Management**: Supports the exchange of information related to planned and unplanned outages.

### 3. CIM Extensions

CIM extensions are additional components that extend the core CIM model to support specific requirements or functionalities. These extensions are developed by industry stakeholders and are incorporated into the CIM standard through a formal approval process. Examples of CIM extensions include:

- **CIM for Distribution**: Extends the CIM model to cover distribution networks and their specific characteristics.
- **CIM for Renewables**: Adds support for renewable energy sources, such as wind and solar power.

## Implementation and Adoption

The implementation of the CIM involves several steps, including the development of CIM-compliant systems, the creation of CIM profiles, and the integration of these systems with existing infrastructure. ENTSO-E provides guidelines and tools to support the implementation of the CIM, including:

- **Implementation Guides**: Detailed documents that provide step-by-step instructions for implementing the CIM in various contexts.
- **Validation Tools**: Software tools that validate the compliance of CIM implementations with the standard.
- **Training and Support**: Training programs and support services to help stakeholders understand and implement the CIM.

## References
* [Entso-E CIM Model description](https://www.entsoe.eu/data/cim/) containing general description of the CIM model
* [Entso-E EDI Library](https://www.entsoe.eu/publications/electronic-data-interchange-edi-library/) containing technical documents on the model
* [NBM message implementations](https://nordic-balancing.pages.fifty.eu/information/index.html) contains the extensions for CIM model in the scope of Nordic Balancing Model (NBM)
