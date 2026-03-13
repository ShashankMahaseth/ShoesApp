import { SessionLocalDataSource } from "../../data/datasource/sessionLocalDataSource";
import { SessionRepositoryImplementation } from "../../data/repositories/SessionRepositoryImplementation";
import { ClearSessionUseCase } from "../../domain/usecase/session/ClearSessionUseCase";
import { GetSessionStatusUseCase } from "../../domain/usecase/session/GetSessionStatusUseCase";
import { MarkFirstTimeDoneUseCase } from "../../domain/usecase/session/MarkFirstTimeDoneUseCase";
import { SetLoggedInUseCase } from "../../domain/usecase/session/SetLoggedInUseCase";

const sessionDataSource = new SessionLocalDataSource();
const sessionRepository = new SessionRepositoryImplementation(sessionDataSource);

export const sessionUseCases = {
  getStatus: new GetSessionStatusUseCase(sessionRepository),
  markFirstTimeDone: new MarkFirstTimeDoneUseCase(sessionRepository),
  setLoggedIn: new SetLoggedInUseCase(sessionRepository),
  clear: new ClearSessionUseCase(sessionRepository),
};
