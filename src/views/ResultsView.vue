<template>

  <div class="result-view">
      <h1 class="title">Results: </h1>
    <div class="podium">
      <svg width="210" height="250">
        <rect width="200" height="150" style="fill:rgb(67, 67, 173);stroke-width:3;stroke:rgb(0,0,0)" />
        <text x="50%" y="47%" alignment-baseline="bottom" text-anchor="middle" fill="white">2nd Place</text>
        <text x="50%" y="10%" alignment-baseline="bottom" text-anchor="middle" fill="white">Namn på tvåan</text>
      </svg>

      <svg width="210" height="330">
        
        <rect width="200" height="230" style="fill:rgb(56, 159, 109);stroke-width:3;stroke:rgb(0,0,0)" />
        <text x="50%" y="60%" alignment-baseline="bottom" text-anchor="middle" fill="white">1st Place</text>
        <text x="50%" y="10%" alignment-baseline="bottom" text-anchor="middle" fill="white">Namn på ettan</text>
      </svg>

      <svg width="210" height="200">
        <rect width="200" height="100" style="fill:rgb(229, 78, 169);stroke-width:3;stroke:rgb(0,0,0)" />
        <text x="50%" y="35%" alignment-baseline="bottom" text-anchor="middle" fill="white">3rd Place</text>
        <text x="50%" y="10%" alignment-baseline="bottom" text-anchor="middle" fill="white">Namn på trean</text>
      </svg>        
    </div>  
    <div class="losers">
        <h2 style="margin-top: -80px;">Losers: </h2>
        <ul>
          <li>den som kom fyra</li>
          <li>den som kom femma</li>
          <li>den som kom sexa</li>
          <li>osv</li>
        </ul>
        
        <!--lista med placering och användarnman för de utanför top 3-->
    </div> 
  </div> 
   
    
         
 



</template>


<script>

</script>

<style >
.result-view {
  background-image: linear-gradient(to bottom right, red, yellow);
  color: rgb(28, 28, 28);
  /*display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;*/
  height: 100vh;
}

.title {
  color: black;
  font-size: 50px;
  margin-bottom: 00px;
  position: center;
  margin-top: -7px;
  padding:30px;
}

.losers{
  width: 40%;
  box-sizing: border-box;
  float: left;
  margin-bottom: 5vh;
}

</style>