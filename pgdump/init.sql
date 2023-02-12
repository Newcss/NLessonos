--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--
ALTER DATABASE nlessonsdb OWNER TO nlessonsuser;

\connect nlessonsdb

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: lesson; Type: TABLE; Schema: public; Owner: nlessonsuser
--

CREATE TABLE public.lesson (
    id integer NOT NULL,
    title character varying NOT NULL,
    status boolean DEFAULT false NOT NULL,
    date timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.lesson OWNER TO nlessonsuser;

--
-- Name: lesson_id_seq; Type: SEQUENCE; Schema: public; Owner: nlessonsuser
--

CREATE SEQUENCE public.lesson_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lesson_id_seq OWNER TO nlessonsuser;

--
-- Name: lesson_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nlessonsuser
--

ALTER SEQUENCE public.lesson_id_seq OWNED BY public.lesson.id;


--
-- Name: lesson_students; Type: TABLE; Schema: public; Owner: nlessonsuser
--

CREATE TABLE public.lesson_students (
    id integer NOT NULL,
    visit boolean NOT NULL,
    "studentId" integer,
    "lessonId" integer
);


ALTER TABLE public.lesson_students OWNER TO nlessonsuser;

--
-- Name: lesson_students_id_seq; Type: SEQUENCE; Schema: public; Owner: nlessonsuser
--

CREATE SEQUENCE public.lesson_students_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lesson_students_id_seq OWNER TO nlessonsuser;

--
-- Name: lesson_students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nlessonsuser
--

ALTER SEQUENCE public.lesson_students_id_seq OWNED BY public.lesson_students.id;


--
-- Name: lesson_teachers; Type: TABLE; Schema: public; Owner: nlessonsuser
--

CREATE TABLE public.lesson_teachers (
    id integer NOT NULL,
    "teacherId" integer,
    "lessonId" integer
);


ALTER TABLE public.lesson_teachers OWNER TO nlessonsuser;

--
-- Name: lesson_teachers_id_seq; Type: SEQUENCE; Schema: public; Owner: nlessonsuser
--

CREATE SEQUENCE public.lesson_teachers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lesson_teachers_id_seq OWNER TO nlessonsuser;

--
-- Name: lesson_teachers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nlessonsuser
--

ALTER SEQUENCE public.lesson_teachers_id_seq OWNED BY public.lesson_teachers.id;


--
-- Name: student; Type: TABLE; Schema: public; Owner: nlessonsuser
--

CREATE TABLE public.student (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.student OWNER TO nlessonsuser;

--
-- Name: student_id_seq; Type: SEQUENCE; Schema: public; Owner: nlessonsuser
--

CREATE SEQUENCE public.student_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.student_id_seq OWNER TO nlessonsuser;

--
-- Name: student_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nlessonsuser
--

ALTER SEQUENCE public.student_id_seq OWNED BY public.student.id;


--
-- Name: teacher; Type: TABLE; Schema: public; Owner: nlessonsuser
--

CREATE TABLE public.teacher (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.teacher OWNER TO nlessonsuser;

--
-- Name: teacher_id_seq; Type: SEQUENCE; Schema: public; Owner: nlessonsuser
--

CREATE SEQUENCE public.teacher_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.teacher_id_seq OWNER TO nlessonsuser;

--
-- Name: teacher_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nlessonsuser
--

ALTER SEQUENCE public.teacher_id_seq OWNED BY public.teacher.id;


--
-- Name: lesson id; Type: DEFAULT; Schema: public; Owner: nlessonsuser
--

ALTER TABLE ONLY public.lesson ALTER COLUMN id SET DEFAULT nextval('public.lesson_id_seq'::regclass);


--
-- Name: lesson_students id; Type: DEFAULT; Schema: public; Owner: nlessonsuser
--

ALTER TABLE ONLY public.lesson_students ALTER COLUMN id SET DEFAULT nextval('public.lesson_students_id_seq'::regclass);


--
-- Name: lesson_teachers id; Type: DEFAULT; Schema: public; Owner: nlessonsuser
--

ALTER TABLE ONLY public.lesson_teachers ALTER COLUMN id SET DEFAULT nextval('public.lesson_teachers_id_seq'::regclass);


--
-- Name: student id; Type: DEFAULT; Schema: public; Owner: nlessonsuser
--

ALTER TABLE ONLY public.student ALTER COLUMN id SET DEFAULT nextval('public.student_id_seq'::regclass);


--
-- Name: teacher id; Type: DEFAULT; Schema: public; Owner: nlessonsuser
--

ALTER TABLE ONLY public.teacher ALTER COLUMN id SET DEFAULT nextval('public.teacher_id_seq'::regclass);


--
-- Data for Name: lesson; Type: TABLE DATA; Schema: public; Owner: nlessonsuser
--

COPY public.lesson (id, title, status, date) FROM stdin;
1	Теория Вычислительных Процессов	f	2023-02-09 00:00:00
2	Теория Вероятности	t	2023-02-12 00:00:00
205	Theme New	f	2022-02-18 00:00:00
206	Theme New	f	2022-02-22 00:00:00
207	Theme New	f	2022-02-19 00:00:00
208	Theme New	f	2022-02-23 00:00:00
209	Theme New	f	2022-02-21 00:00:00
210	Theme New	f	2022-02-18 00:00:00
211	Theme New	f	2022-02-19 00:00:00
212	Theme New	f	2022-02-22 00:00:00
213	Theme New	f	2022-02-23 00:00:00
214	Theme New	f	2022-02-21 00:00:00
215	Theme New	f	2022-02-18 00:00:00
216	Theme New	f	2022-02-19 00:00:00
217	Theme New	f	2022-02-21 00:00:00
218	Theme New	f	2022-02-22 00:00:00
219	Theme New	f	2022-02-23 00:00:00
\.


--
-- Data for Name: lesson_students; Type: TABLE DATA; Schema: public; Owner: nlessonsuser
--

COPY public.lesson_students (id, visit, "studentId", "lessonId") FROM stdin;
13	t	1	1
20	t	2	1
25	f	3	205
26	f	4	205
27	f	5	205
\.


--
-- Data for Name: lesson_teachers; Type: TABLE DATA; Schema: public; Owner: nlessonsuser
--

COPY public.lesson_teachers (id, "teacherId", "lessonId") FROM stdin;
1	1	1
2	2	2
3	3	2
49	1	205
50	2	205
51	3	205
52	1	207
53	2	207
54	3	207
55	1	206
56	2	206
57	3	206
58	1	209
59	2	209
60	3	209
61	1	208
62	2	208
63	3	208
64	1	210
65	2	210
66	3	210
67	1	211
68	2	211
69	3	211
70	1	212
71	2	212
72	3	212
73	1	214
74	2	214
75	3	214
76	1	213
77	2	213
78	3	213
79	1	215
80	2	215
81	3	215
82	1	216
83	2	216
84	3	216
85	1	217
86	2	217
87	3	217
88	1	218
89	2	218
90	3	218
91	1	219
92	2	219
93	3	219
\.


--
-- Data for Name: student; Type: TABLE DATA; Schema: public; Owner: nlessonsuser
--

COPY public.student (id, name) FROM stdin;
1	Петров Семен Иванович
2	Баранова Анна Сергеевна
3	Петросян Марина Александровна
4	Мурин Андрей Валерьевич
5	Божко Мария Федоровна
6	Семенов Петр Андреевич
7	Степаненко Валентин Игоревич
8	Лукьяненко Степан Алексеевич
\.


--
-- Data for Name: teacher; Type: TABLE DATA; Schema: public; Owner: nlessonsuser
--

COPY public.teacher (id, name) FROM stdin;
1	Ключарев Александр Анатольевич
2	Хименко Виталий Иванович
3	Охтилев Михаил Юрьевич
4	Коцаренко Валентин Валерьевич
5	Баранов Степан Игоревич
6	Лысенко Петр Андреевич
7	Курган Ольга Васильевна
\.


--
-- Name: lesson_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nlessonsuser
--

SELECT pg_catalog.setval('public.lesson_id_seq', 219, true);


--
-- Name: lesson_students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nlessonsuser
--

SELECT pg_catalog.setval('public.lesson_students_id_seq', 27, true);


--
-- Name: lesson_teachers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nlessonsuser
--

SELECT pg_catalog.setval('public.lesson_teachers_id_seq', 93, true);


--
-- Name: student_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nlessonsuser
--

SELECT pg_catalog.setval('public.student_id_seq', 8, true);


--
-- Name: teacher_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nlessonsuser
--

SELECT pg_catalog.setval('public.teacher_id_seq', 7, true);


--
-- Name: lesson PK_0ef25918f0237e68696dee455bd; Type: CONSTRAINT; Schema: public; Owner: nlessonsuser
--

ALTER TABLE ONLY public.lesson
    ADD CONSTRAINT "PK_0ef25918f0237e68696dee455bd" PRIMARY KEY (id);


--
-- Name: lesson_teachers PK_175c66868779e76bcc52a41909e; Type: CONSTRAINT; Schema: public; Owner: nlessonsuser
--

ALTER TABLE ONLY public.lesson_teachers
    ADD CONSTRAINT "PK_175c66868779e76bcc52a41909e" PRIMARY KEY (id);


--
-- Name: teacher PK_2f807294148612a9751dacf1026; Type: CONSTRAINT; Schema: public; Owner: nlessonsuser
--

ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT "PK_2f807294148612a9751dacf1026" PRIMARY KEY (id);


--
-- Name: student PK_3d8016e1cb58429474a3c041904; Type: CONSTRAINT; Schema: public; Owner: nlessonsuser
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY (id);


--
-- Name: lesson_students PK_d33165e88bff951f7a4c98a9a35; Type: CONSTRAINT; Schema: public; Owner: nlessonsuser
--

ALTER TABLE ONLY public.lesson_students
    ADD CONSTRAINT "PK_d33165e88bff951f7a4c98a9a35" PRIMARY KEY (id);


--
-- Name: lesson_students FK_0e5bf0c9d106b8caf708d029a08; Type: FK CONSTRAINT; Schema: public; Owner: nlessonsuser
--

ALTER TABLE ONLY public.lesson_students
    ADD CONSTRAINT "FK_0e5bf0c9d106b8caf708d029a08" FOREIGN KEY ("studentId") REFERENCES public.student(id);


--
-- Name: lesson_teachers FK_67d72981eaf52acf1673ca53a5f; Type: FK CONSTRAINT; Schema: public; Owner: nlessonsuser
--

ALTER TABLE ONLY public.lesson_teachers
    ADD CONSTRAINT "FK_67d72981eaf52acf1673ca53a5f" FOREIGN KEY ("lessonId") REFERENCES public.lesson(id);


--
-- Name: lesson_teachers FK_84f4630339eabfa2fe7e2f2fa54; Type: FK CONSTRAINT; Schema: public; Owner: nlessonsuser
--

ALTER TABLE ONLY public.lesson_teachers
    ADD CONSTRAINT "FK_84f4630339eabfa2fe7e2f2fa54" FOREIGN KEY ("teacherId") REFERENCES public.teacher(id);


--
-- Name: lesson_students FK_9946e782fd5605ffed1eb830b39; Type: FK CONSTRAINT; Schema: public; Owner: nlessonsuser
--

ALTER TABLE ONLY public.lesson_students
    ADD CONSTRAINT "FK_9946e782fd5605ffed1eb830b39" FOREIGN KEY ("lessonId") REFERENCES public.lesson(id);


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3 (Debian 13.3-1.pgdg100+1)
-- Dumped by pg_dump version 13.3 (Debian 13.3-1.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: nlessonsuser
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO nlessonsuser;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: nlessonsuser
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

