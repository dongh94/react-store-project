### React Store Project



### ContextAPI + useReducer

1. **reducer 정의** → state와 action 처리 로직 작성
2. **context 생성** → `createContext()` 로 전역 state 컨테이너 만들기
3. **provider 정의** → `useReducer()` 로 state+dispatch 생성 후 `Context.Provider` 로 감싸기
4. **앱에 provider 적용** → 루트 컴포넌트에서 provider로 children 감싸기
5. **hook 생성** → `useContext()` 로 기능별 hook 생성해서 **state 사용**, **action 실행**



### Redux 개발

1. **store 정의** → `configureStore()` 로 중앙 저장소 생성
2. **slice 생성** → `createSlice()` 로 state + reducer + actions 정의
3. **store 연결** → `Provider` 로 React 전역에 store 주입
4. **state 사용** → 컴포넌트에서 `useSelector()` 로 state 조회
5. **action 실행** → 컴포넌트에서 `useDispatch()` 로 action 실행



### Recoil 개발

1. **전역 상태 준비** → `RecoilRoot` 로 앱 최상단 감싸기
2. **atom 생성** → `atom()` 으로 전역 state 정의
3. **selector 생성 (선택)** → `selector()` 로 파생/계산 state 정의
4. **state 사용** → 컴포넌트에서 `useRecoilValue()` / `useRecoilState()` 로 조회 및 변경
5. **state 변경** → `useSetRecoilState()` 또는 `useRecoilState()` 로 값 업데이트
   - `useRecoilState(atom)`: 값 읽기+쓰기, 해당 값에 구독됨 → 값 변경 시 컴포넌트 재렌더
   - `useRecoilValue(atom|selector)`: 읽기 전용, 값 구독 → 파생 상태 변경 시 재렌더
   - `useSetRecoilState(atom)`: 쓰기 전용, 값 구독하지 않음 → 제어용 버튼/폼에 적합
   - `useResetRecoilState(atom)`: atom을 기본값(default)으로 즉시 초기화



### Jotai 개발

1. **전역 상태 준비** → 별도의 Provider 불필요 (필요 시 `Provider`로 스코프 분리 가능)
2. **atom 생성** → `atom()` 으로 전역 state 정의
3. **derived atom 생성 (선택)** → 다른 atom을 기반으로 계산된 상태 정의
4. **state 사용** → 컴포넌트에서 `useAtom()` 으로 읽기 + 쓰기
5. **읽기 전용 / 쓰기 전용 분리 (선택)** → `useAtomValue()`(읽기), `useSetAtom()`(쓰기)



### Zustand 개발

1. **store 생성** → `create()` 함수로 전역 상태와 액션 정의 (별도의 Provider 불필요)
2. **store 분리 (선택)** → 기능별 slice 패턴으로 모듈화
3. **state 사용** → 컴포넌트에서 `useStore((state) => state.xxx)` 로 조회
4. **state 변경** → 동일한 훅에서 액션 실행 (`useStore((state) => state.increment)`)
5. **middleware 활용 (선택)** → `persist`, `devtools`, `immer` 등으로 확장
