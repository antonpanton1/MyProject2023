<template>

  <div class="result-view">
      <h1 class="title">Results: </h1>
    <div class="podium">
      <svg width="200" height="250">
        <rect width="200" height="150" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)" />
      </svg>
      <svg width="200" height="330">
        <rect width="200" height="230" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)" />
      </svg>
      <svg width="200" height="200">
        <rect width="200" height="100" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)" />
      </svg>
    </div>  
    <div class="losers">
        <h2>Losers: </h2>
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

.users{
  width: 50%;
  box-sizing: border-box;
  float: left;
  margin-bottom: 350px;
}

</style>