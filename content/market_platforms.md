# Market Platforms

## Overview
The following platforms are used between Fingrid and Balance Service Providers in reserve trading:

|  | FFR  | FCR-D | FCR-N | aFRR capacity | aFRR energy | mFRR capacity | mFRR energy |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Fingrid Vaksi  | X | X | X |   | X |   | X |
| Fifty NMMS  |   |   |   | X |   | X |   |

MARI and PICASSO messaging will go trough Fingrid Vaksi system. 

## Nordic Market Management System (NMMS)
NMMS is a platform developed by Fifty that is used on the aFRR and mFRR capacity market. Fifty operates as a service provider for Fingrid.

Finnish balance service providers submit their aFRR bids primarily to the NMMS platform, except for fallback situations. In these fallback situations aFRR and mFRR bids are submitted manually through Vaksi.
 
Instructions and information about the aFRR and mFRR capacity market are also available in the Nordic implementation guide: 
https://nordicbalancingmodel.net/wp-content/uploads/2021/03/Implementation-Guide-aFRR-capacity-market-BSP_v2.6.pdf and 
https://nordicbalancingmodel.net/wp-content/uploads/2024/09/Implementation-Guide-mFRR-capacity-market-BSP-ver-1.3.pdf

Fingrid provides Fifty credentials to reserve market participants as part of the market joining process or upon request. Fingrid configures the reserve supplier’s portfolio on the Fifty platform based on the information provided. The reserve supplier can also have a service provider configured on the platform.

## Vaksi

The Vaksi application is one of the most important tools for managing information exchange regarding reserve trading between balancing service providers (BSP’s) and Fingrid. Through the user interface of Vaksi, BSP’s can submit bids to different marketplaces, view and modify their previously submitted bids as well as see the results of the auctions (accepted bids). In addition, it is possible to accept electronic activations requested by Fingrid on the mFRR-market through Vaksi.

Logging in into Vaksi requires a username and password, which the BSP receives from Fingrid in connection with the market entry process. Before receiving the credentials from Fingrid, the BSP must inform Fingrid about the IP-address(es) used for logging into Vaksi, so that that the necessary firewall openings can be done.

More detailed information and instructions regarding navigation in Vaksi, the content of the screens and data entry are available in Fingrid's reserve trading and information exchange guidelines -document.

## Mimosa

Mimosa is the new market management platform from Fingrid. It is planned to be commissioned during 2026. The complete replacement for all Vaksi functionalities will be ready by 2027. Mimosa will support accession to MARI and Picasso platforms among with the Finnish and Nordic markets. 

## PICASSO

The Platform for the International Coordination of Automated Frequency Restoration and Stable System Operation (PICASSO) is the implementation project endorsed by all TSOs through the ENTSO-E Market Committee to establish the European platform for the exchange of balancing energy from frequency restoration reserves with automatic activation or aFRR-Platform, pursuant to Article 21 of the Commission Regulation (EU) 2017/2195 of 23 November 2017 establishing a guideline on electricity balancing (EB GL). More information on PICASSO can be found from the Entso-E [PICASSO webpages](https://www.entsoe.eu/network_codes/eb/picasso/).

Fingrid manages the accession to PICASSO. All the market participant communication towards PICASSO will be handled via Fingrid's systems. 

## MARI

MARI is the European implementation project for the creation of the European mFRR platform. MARI project includes 28 TSO members and 4 TSO observers (see [MARI webpage](https://www.entsoe.eu/network_codes/eb/mari/) for further details). The project establishes the European platform for the exchange of balancing energy from frequency restoration reserves with manual activation or mFRR-Platform, pursuant to Article 20 of the Commission Regulation (EU) 2017/2195 of 23 November 2017 establishing a guideline on electricity balancing (EB Regulation).

Fingrid will manage the accession to MARI. All the market participant communication towards MARI will be handled via Fingrid's systems. 
