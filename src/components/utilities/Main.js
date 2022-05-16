import styled from "styled-components";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  height: 100%;
  align-self: center;
  ul{
      margin-top: 20px;
   
      li{
        border: 1px solid rgb(230, 230, 230);
        padding: 15px;
        height: 140px;
        display: flex;
        align-items: center;
        padding: 10px;
      }
      img{
          height: 100px;
          width: 100px;
      }
      a{
        text-decoration: none;
      color: #000;
      }
      h1{
         font-size: 15px;
         margin-bottom: 15px;
      }
      h2{
        color:#25962b;
        font-size: 25px;
        span{
          font-size: 15px;
          font-weight: 400;
        }
      }
      h3{

      }
      .description{
          width: 275px;
          padding: 15px;
      }
  }
`;
export default Main;