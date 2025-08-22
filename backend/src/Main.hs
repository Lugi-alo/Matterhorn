{-# LANGUAGE DataKinds #-}
{-# LANGUAGE TypeOperators #-}
{-# LANGUAGE DeriveGeneric #-}

module Main (main) where

import Phases
import Servant
import Network.Wai.Handler.Warp (run)
import Data.IORef
import System.IO.Unsafe (unsafePerformIO)
import Control.Monad.IO.Class (liftIO)

workflowVar :: IORef Workflow
workflowVar = unsafePerformIO $ newIORef (Workflow [])
{-# NOINLINE workflowVar #-}

initialiseHandler :: [Phase] -> Handler Workflow
initialiseHandler phases = do
  let workflow = initialiseWorkflow (Workflow phases)
  liftIO $ writeIORef workflowVar workflow
  pure workflow

advanceHandler :: Handler Workflow
advanceHandler = do
  liftIO $ modifyIORef workflowVar advanceWorkflow
  liftIO $ readIORef workflowVar

type API =
    "initialise" :> ReqBody '[JSON] [Phase] :> Post '[JSON] Workflow 
    :<|> "advance" :> Post '[JSON] Workflow

server :: Server API
server = initialiseHandler :<|> advanceHandler

api :: Proxy API
api = Proxy

app :: Application
app = serve api server

main :: IO ()
main = do
  putStrLn "Starting backen on http://localhost:8080"
  run 8080 app