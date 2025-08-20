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

initialiseHandler :: Handler Workflow
initialiseHandler = do
  liftIO $ modifyIORef workflowVar initialiseWorkflow
  liftIO $ readIORef workflowVar 

advanceHandler :: Handler Workflow
advanceHandler = do
  liftIO $ modifyIORef workflowVar advanceWorkflow
  liftIO $ readIORef workflowVar


type API =
    "initialise" :> Get '[JSON] Workflow 
    :<|> "advance" :> Get '[JSON] Workflow

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