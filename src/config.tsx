export const refreshInterval = 10000;
export const LBAPIURL = "https://lb.diep.io/api/lb/"
export const baseGameURL = "https://diep.io" //"https://beta.diep.io/"
export const baseMobileGameURL = "https://mobile.diep.io" //"https://beta.diep.io/"

export const graphAPIURL = "https://srv852039.hstgr.cloud/playergraphs/getgraph"
export const pushStatAPIURL = "https://srv852039.hstgr.cloud/playergraphs/pushplayerstat"
export const otherLBAPIURL = "https://srv852039.hstgr.cloud/playergraphs/lb/"

export const publicFileRoot = "https://dieplobbypicker.io" //""

export const gameIDs: Record<string, number> = { // idk where these come from and they probably change every update
  "atl-fc83e7c455d1cbec.diep.io:2006": 63933,
  "atl-fc83e7c455d1cbec.diep.io:2001": 28543,
  //"atl-fc83e7c455d1cbec.diep.io:2007": 57903, // atl 2tdm 1
  //"atl-fc83e7c455d1cbec.diep.io:2001": 33579, // atl 2tdm 2
  "fra-43ce658e19c456d0.diep.io:2001": 25225, // fra 2tdm
  "sgp-97b904129f583cef.diep.io:2001": 31220, // sgp 2tdm
  "syd-c33a430721f75586.diep.io:2001": 43127, // syd 2tdm
  
  "atl-fc83e7c455d1cbec.diep.io:2005": 23468,
  //"atl-fc83e7c455d1cbec.diep.io:2006": 11140, // atl 4tdm
  "fra-43ce658e19c456d0.diep.io:2003": 25225, // fra 4tdm
  "sgp-97b904129f583cef.diep.io:2003": 31220, // sgp 4tdm
  "syd-c33a430721f75586.diep.io:2003": 43127, // syd 4tdm
}