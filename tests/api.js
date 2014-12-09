	

    function pull(toonName,toonRealm) {
     
      if(!toonName)
      {
        return "";
      }
        if(!toonRealm)
      {
        return "";
      }
     
      var toonJSON = UrlFetchApp.fetch("us.battle.net/api/wow/character/"+toonRealm+"/"+toonName+"?fields=items,statistics,progression");
      var toon = JSON.parse(toonJSON.getContentText());
     
      var wodstats = toon.statistics.subCategories[5].subCategories[5].statistics
     
      var gugrokkkills = wodstats[1].quantity
      var skullockills = wodstats[3].quantity
      var terongorkills = wodstats[5].quantity
      var viryxkills = wodstats[7].quantity
      var tovrakills = wodstats[9].quantity
      var yalnukills = wodstats[11].quantity
      var nerzhulkills = wodstats[13].quantity
      var zaelakills = wodstats[15].quantity
     
      var headlvl = toon.items.head.itemLevel
      if (headlvl > 630) { headlvl = 630 }
     
      var necklvl = toon.items.neck.itemLevel
      if (necklvl > 630) { necklvl = 630 }
     
      var shoulderlvl = toon.items.shoulder.itemLevel
      if (shoulderlvl > 630) { shoulderlvl = 630 }
     
      var backlvl = toon.items.back.itemLevel
      if (backlvl > 630) { backlvl = 630 }
     
      var chestlvl = toon.items.chest.itemLevel
      if (chestlvl > 630) { chestlvl = 630 }
     
      var wristlvl = toon.items.wrist.itemLevel
      if (wristlvl > 630) { wristlvl = 630 }
     
      var weaponlvl = toon.items.mainHand.itemLevel
      if (weaponlvl > 630) { weaponlvl = 630 }
     
      var offhandlvl = 0
      var offhand = 0
      if (toon.items.offHand) {
        offhandlvl = toon.items.offHand.itemLevel
        offhand = offhandlvl
        if (offhandlvl > 630) { offhandlvl = 630 }
      }
     
      var handslvl = toon.items.hands.itemLevel
      if (handslvl > 630) { handslvl = 630 }
     
      var waistlvl = toon.items.waist.itemLevel
      if (waistlvl > 630) { waistlvl = 630 }
     
      var legslvl = toon.items.legs.itemLevel
      if (legslvl > 630) { legslvl = 630 }
     
      var feetlvl = toon.items.feet.itemLevel
      if (feetlvl > 630) { feetlvl = 630 }
     
      var finger1lvl = toon.items.finger1.itemLevel
      if (finger1lvl > 630) { finger1lvl = 630 }
     
      var finger2lvl = toon.items.finger2.itemLevel
      if (finger2lvl > 630) { finger2lvl = 630 }
     
      var trinket1lvl = toon.items.trinket1.itemLevel
      if (trinket1lvl > 630) { trinket1lvl = 630 }
     
      var trinket2lvl = toon.items.trinket2.itemLevel
      if (trinket2lvl > 630) { trinket2lvl = 630 }
     
      var CM_iL_Total = headlvl+necklvl+shoulderlvl+backlvl+chestlvl+wristlvl+handslvl+waistlvl+legslvl+feetlvl+finger1lvl+finger2lvl+trinket1lvl+trinket2lvl+weaponlvl+offhandlvl
      var CM_iL = CM_iL_Total / 16
      if (offhandlvl == 0) { CM_iL = CM_iL_Total / 15 }
     
      var highmaulN = 0;
      var highmaulH = 0;
      var highmaulM = 0;
      for (i= 0; i < 7; i++)
      {
        if(toon.progression.raids[32].bosses[i].normalKills != 0)
        {
          highmaulN+=toon.progression.raids[32].bosses[i].normalKills
        }
        if(toon.progression.raids[32].bosses[i].heroicKills != 0)
        {
          highmaulH+=toon.progression.raids[32].bosses[i].heroicKills
        }
        if(toon.progression.raids[32].bosses[i].mythicKills != 0)
        {
          highmaulM+=toon.progression.raids[32].bosses[i].mythicKills
        }  
      }
     
      var brfN = 0;
      var brfH = 0;
      var brfM = 0;
      for (i= 0; i < 10; i++)
      {
        if(toon.progression.raids[33].bosses[i].normalKills != 0)
        {
          brfN+=toon.progression.raids[33].bosses[i].normalKills
        }
        if(toon.progression.raids[33].bosses[i].heroicKills != 0)
        {
          brfH+=toon.progression.raids[33].bosses[i].heroicKills
        }
        if(toon.progression.raids[33].bosses[i].mythicKills != 0)
        {
          brfM+=toon.progression.raids[33].bosses[i].mythicKills
        }  
      }
     
      var toonInfo = new Array(
        toon.level, toon.items.averageItemLevelEquipped, Math.floor(CM_iL),
        Math.max(toon.items.finger1.itemLevel, toon.items.finger2.itemLevel),
        nerzhulkills+zaelakills+gugrokkkills+skullockills+terongorkills+viryxkills+yalnukills+tovrakills,
        toon.items.head.itemLevel, toon.items.neck.itemLevel,
            toon.items.shoulder.itemLevel, toon.items.back.itemLevel,
            toon.items.chest.itemLevel, toon.items.wrist.itemLevel,
            toon.items.hands.itemLevel, toon.items.waist.itemLevel,
            toon.items.legs.itemLevel, toon.items.feet.itemLevel,
            toon.items.finger1.itemLevel, toon.items.finger2.itemLevel,
            toon.items.trinket1.itemLevel,toon.items.trinket2.itemLevel,
        toon.items.mainHand.itemLevel, offhand,
            highmaulN, highmaulH, highmaulM,
        brfN, brfH, brfM
      )
     return toonInfo;
    }

