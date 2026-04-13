const KontentDelivery = require("@kentico/kontent-delivery");
import { Aboutportfoliopage } from "@/models/aboutportfoliopage";
import { Aicpartneritem } from "@/models/aicpartneritem";
import { Aim2026page } from "@/models/aim2026page";
import { Awarditem2026 } from "@/models/awarditem2026";
import { Awardpage2026 } from "@/models/awardpage2026";
import { Basiccontentpage } from "@/models/basiccontentpage";
import { Blogitems } from "@/models/blogitems";
import { Blogs } from "@/models/blogs";
import { Conferencedates } from "@/models/conferencedates";
import { Conferencepage } from "@/models/conferencepage";
import { Conferencepage2026 } from "@/models/conferencepage2026";
import { Delegatepackagepage } from "@/models/delegatepackagepage";
import { Downloadagendapage } from "@/models/downloadagendapage";
import { Downloadpage } from "@/models/downloadpage";
import { EntrepreneurPortfolio } from "@/models/entrepreneur_portfolio";
import { Eventinformationpage } from "@/models/eventinformationpage";
import { Fdiawardpage } from "@/models/fdiawardpage";
import { Form } from "@/models/form";
import { Form2026 } from "@/models/form2026";
import { Futurecitiesawards } from "@/models/futurecitiesawards";
import { Futurefinanceawardpage } from "@/models/futurefinanceawardpage";
import { Global2026 } from "@/models/global2026";
import { Homepage } from "@/models/homepage";
import { Homepage2026 } from "@/models/homepage2026";
import { Hotelpage } from "@/models/hotelpage";
import { Investmentdestinationpagefdi } from "@/models/investmentdestinationpagefdi";
import { Knowledgehubpage2026 } from "@/models/knowledgehubpage2026";
import { Matchmakingpage2026 } from "@/models/matchmakingpage2026";
import { Moupage2026 } from "@/models/moupage2026";
import { Opencallspage } from "@/models/opencallspage";
import { Ourteampage } from "@/models/ourteampage";
import { Paperitem } from "@/models/paperitem";
import { Partnerspage } from "@/models/partnerspage";
import { Partnerspageitem } from "@/models/partnerspageitem";
import { Pillardetailpageitem } from "@/models/pillardetailpageitem";
import { Pillarpage2026 } from "@/models/pillarpage2026";
import { Portfoliopage } from "@/models/portfoliopage";
import { Postshowreport } from "@/models/postshowreport";
import { Postshowreportyear } from "@/models/postshowreportyear";
import { Pressrelaseitem } from "@/models/pressrelaseitem";
import { Pressrelease } from "@/models/pressrelease";
import { Reportitem } from "@/models/reportitem";
import { Seometadata } from "@/models/seometadata";
import { Sessionspeaker } from "@/models/sessionspeaker";
import { Speaker } from "@/models/speaker";
import { Sponsorspage } from "@/models/sponsorspage";







export const TypeResolver = [
  // new KontentDelivery.TypeResolver("Menu", (rawData: any) => new Menu()),



  new KontentDelivery.TypeResolver("Blogs", (rawData: any) => new Blogs()),
  new KontentDelivery.TypeResolver("Blogitems", (rawData: any) => new Blogitems()),
  new KontentDelivery.TypeResolver("Postshowreport", (rawData: any) => new Postshowreport()),
  new KontentDelivery.TypeResolver("Postshowreportyear", (rawData: any) => new Postshowreportyear()),

  new KontentDelivery.TypeResolver("Reportitem", (rawData: any) => new Reportitem()),
  new KontentDelivery.TypeResolver("Speaker", (rawData: any) => new Speaker()),
  new KontentDelivery.TypeResolver("Sponsorspage", (rawData: any) => new Sponsorspage()),
  new KontentDelivery.TypeResolver("Pressrelease", (rawData: any) => new Pressrelease()),
  new KontentDelivery.TypeResolver("Pressrelaseitem", (rawData: any) => new Pressrelaseitem()),
  new KontentDelivery.TypeResolver("Basiccontentpage", (rawData: any) => new Basiccontentpage()),
  new KontentDelivery.TypeResolver("PartnersPage", (rawData: any) => new Partnerspage()),

  new KontentDelivery.TypeResolver("Portfoliopage", (rawData: any) => new Portfoliopage()),
  new KontentDelivery.TypeResolver("Conferencepage", (rawData: any) => new Conferencepage()),
  new KontentDelivery.TypeResolver("Conferencedates", (rawData: any) => new Conferencedates()),

  new KontentDelivery.TypeResolver("Sessionspeaker", (rawData: any) => new Sessionspeaker()),


  new KontentDelivery.TypeResolver("Partnerspageitem", (rawData: any) => new Partnerspageitem()),

  new KontentDelivery.TypeResolver("Fdiawardpage", (rawData: any) => new Fdiawardpage()),

  new KontentDelivery.TypeResolver("Investmentdestinationpagefdi", (rawData: any) => new Investmentdestinationpagefdi()),
  new KontentDelivery.TypeResolver("HomePage", (rawData: any) => new Homepage()),
  new KontentDelivery.TypeResolver("EntrepreneurPortfolio", (rawData: any) => new EntrepreneurPortfolio()),

  new KontentDelivery.TypeResolver("Aboutportfoliopage", (rawData: any) => new Aboutportfoliopage()),
  new KontentDelivery.TypeResolver("Seometadata", (rawData: any) => new Seometadata()),
  new KontentDelivery.TypeResolver("Futurefinanceawardpage", (rawData: any) => new Futurefinanceawardpage()),
  new KontentDelivery.TypeResolver("Futurecitiesawards", (rawData: any) => new Futurecitiesawards()),
  new KontentDelivery.TypeResolver("Delegatepackagepage", (rawData: any) => new Delegatepackagepage()),
  new KontentDelivery.TypeResolver("Aicpartneritem", (rawData: any) => new Aicpartneritem()),
  new KontentDelivery.TypeResolver("Form", (rawData: any) => new Form()),
  new KontentDelivery.TypeResolver("Hotelpage", (rawData: any) => new Hotelpage()),
  new KontentDelivery.TypeResolver("Downloadagendapage", (rawData: any) => new Downloadagendapage()),


  new KontentDelivery.TypeResolver("Eventinformationpage", (rawData: any) => new Eventinformationpage()),

  new KontentDelivery.TypeResolver("Global2026", (rawData: any) => new Global2026()),

 new KontentDelivery.TypeResolver("Form2026", (rawData: any) => new Form2026()),

 new KontentDelivery.TypeResolver("Aim2026page", (rawData: any) => new Aim2026page()),
 new KontentDelivery.TypeResolver("Matchmakingpage2026", (rawData: any) => new Matchmakingpage2026()),
  new KontentDelivery.TypeResolver("Pillarpage2026", (rawData: any) => new Pillarpage2026()),

 new KontentDelivery.TypeResolver("Pillardetailpageitem", (rawData: any) => new Pillardetailpageitem()),

  new KontentDelivery.TypeResolver("Homepage2026", (rawData: any) => new Homepage2026()),
    new KontentDelivery.TypeResolver("Opencallspage", (rawData: any) => new Opencallspage()),
 new KontentDelivery.TypeResolver("Conferencepage2026", (rawData: any) => new Conferencepage2026()),
 new KontentDelivery.TypeResolver("Awardpage2026", (rawData: any) => new Awardpage2026()),
 new KontentDelivery.TypeResolver("Awarditem2026", (rawData: any) => new Awarditem2026()),
 new KontentDelivery.TypeResolver("Moupage2026", (rawData: any) => new Moupage2026()),
 new KontentDelivery.TypeResolver("Knowledgehubpage2026", (rawData: any) => new Knowledgehubpage2026()),
  new KontentDelivery.TypeResolver("Paperitem", (rawData: any) => new Paperitem()),

  new KontentDelivery.TypeResolver("Ourteampage", (rawData: any) => new Ourteampage()),
  new KontentDelivery.TypeResolver("Downloadpage", (rawData: any) => new Downloadpage()),







];
