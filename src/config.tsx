export const refreshInterval = 10000;
export const LBAPIURL = "https://lb.diep.io/api/lb/"
export const baseGameURL = "https://diep.io" //"https://beta.diep.io/"
export const baseMobileGameURL = "https://mobile.diep.io" //"https://beta.diep.io/"

export const graphAPIURL = "https://srv852039.hstgr.cloud/playergraphs/getgraph"
export const pushStatAPIURL = "https://srv852039.hstgr.cloud/playergraphs/pushplayerstat"
export const otherLBAPIURL = "https://srv852039.hstgr.cloud/playergraphs/lb/"

export const publicFileRoot = "https://dieplobbypicker.io" //""

export const gameIDs: Record<string, number> = {
  "atl-fc83e7c455d1cbec.diep.io:2001": 52867, // atl 2tdm
  "atl-fc83e7c455d1cbec.diep.io:2003": 52867, // atl 4tdm
  
  "fra-43ce658e19c456d0.diep.io:2001": 65942, // fra 2tdm
  "fra-43ce658e19c456d0.diep.io:2003": 52867, // fra 4tdm

  "sgp-97b904129f583cef.diep.io:2001": 40904, // sgp 2tdm
  "sgp-97b904129f583cef.diep.io:2003": 40904, // sgp 4tdm
  
  "syd-c33a430721f75586.diep.io:2001": 40904, // syd 2tdm
  "syd-c33a430721f75586.diep.io:2003": 40904, // syd 4tdm
}

export const compensatePlayerCounts = true;