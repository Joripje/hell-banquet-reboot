## NoSQL

> Not Only SQL

- 단순히 기존 RDBMS가 가지고 있는 특성뿐만 아니라, 다른 특성들을 부가적으로 지원한다


### 0. NoSQL 등장 배경

2000년 후반으로 넘어오면서 인터넷이 활성화되고, SNS 서비스가 등장하면서 관계형 데이터 또는 정형데이터가 아닌, `비정형데이터`라는 것을 보다 쉽게 담아서 저장하고 처리할 수 있는 구조를 가진 데이터베이스들이 관심받게 되었고, 해당 기술이 점점 발전하게 되면서 NoSQL이 각광받게 되었다.

이러한 배경하에서 어떤 엔지니어들은 NoSQL을 `Modern web-scale databases`라고 정의하기도 한다.

### 1. NoSQL 특징

> 기존 RDBMS보다 **더 융통성 있는 데이터 모델을 사용**하고, **데이터의 저장 및 검색을 위한 특화된 매커니즘을 제공**한다. 이를 통해 NoSQL 데이터베이스는 **단순 검색 및 추가 작업에 있어 매우 최적화된 키-값 저장 기법**을 사용하여, **응답속도나 처리 효율 등에 있어 매우 뛰어난 성능**을 보인다.

즉, NoSQL은 기존 RDBMS와 다음과 같은 차이점을 보인다.

- 관계형 모델을 사용하지 않으며 테이블 간의 **조인 기능 없음**
- 직접 프로그래밍하는 등의 비SQL 인터페이스를 통한 데이터 액세스
- 대부분 여러 대의 데이터베이스 서버를 묶어서(클러스터링) 하나의 데이터베이스를 구성함
- 관계형 데이터베이스에서는 지원하는 **Data처리 완결성(Transaction ACID 지원) 미보장**
- 데이터의 스키마와 속성들을 다양하게 수용 및 동적 정의 (Schema-less)
- 데이터베이스의 중단 없는 서비스와 자동 복구 기능 지원
- 다수가 Open Source로 제공
- 확장성, 가용성, 높은 성능

> NoSQL은 **초고용량 데이터 처리 등 성능에 특화된 목적**을 위해, 비관계형 데이터 저장소에, 비구조적인 데이터를 저장하기 위한 분산 저장 시스템


### 2. MongoDB
1. 아키텍처
- Master-Slave 구조

2. 구성 환경
- 단순한 구성
- sharding 시 config 서버, mongos 서버 추가 구성 필요

3. 복제
- Master-Slave 구조로 replication
- replication 개수만큼 slave 생성
- WriteConcorn level이 요구하는 수준만 복제 성공 시 완료 처리
   - 이후 백그라운드 프로세스로 나머지 복제처리 수행

4. Sharding
- row key가 아닌 일반 컬럼을 sharding key로 지정 가능
- Hash, range 방식 모두 가능

5. Analytic
- Hadoop 연동 connector 사용. HBase보다는 용이하지 않음


https://www.samsungsds.com/kr/insights/1232564_4627.html


![](https://velog.velcdn.com/images/mmy789/post/dff4e419-9d84-4c58-9c37-0b3dadafaff5/image.png)
